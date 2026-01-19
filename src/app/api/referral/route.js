import db from "@/libs/db"
import { NextResponse } from "next/server";
import {getServerSession} from 'next-auth/next'
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function POST(request){

    try{
        const session =await getServerSession(
            authOptions
        )

        const data = await request.json();

        const referralFoundByIdentification = await db.referral.findFirst({
            where: {
                identification: data.identification
            }
        })

        const referralFoundByEmail = await db.referral.findFirst({
            where:{
                email: data.email
            }        
        })

        const referralFoundByPhone = await db.referral.findFirst({
            where:{
                phone: data.phone
            }        
        })

        const parentId = await db.referral.findFirst({
            where:{
                email: session.user.email
            },
            select:{
                id: true
            }
        })

        const userID = await db.user.findFirst({
            where:{
                email: data.email
            },
            select:{
                id: true
            }
        })
        
        if(referralFoundByIdentification){
            return NextResponse.json({error: "La identificación ya está en uso"}, {status: 409})
        }if(referralFoundByEmail){
            return NextResponse.json({error: "El correo electrónico ya está registrado"}, {status: 409})
        }if(referralFoundByPhone){
            return NextResponse.json({error: "El  número de telefono ya está registrado"}, {status: 409})
        }
        if(!parentId && session.user.email != data.email) {
            return NextResponse.json({error: "Aun no ingresas tus datos"}, {status: 409})
        }

        const newReferral = await db.referral.create({
            data: {
                name: data.name,
                identification: data.identification,
                phone: data.phone,
                address: data.address,
                email: data.email,
                referrerId: parseInt("1"),
                referredId: parseInt(userID?.id) ?? null,
                parentId: parseInt(parentId?.id) ?? null
            }
        })
        console.log(newReferral)
        return NextResponse.json(newReferral)
    }catch(error){
        return NextResponse.json({ message: error.message },{ status: 500 })
    }
}

export async function GET(request){
    try{
        const session =await getServerSession(
            authOptions
        )
        const referralId = await db.referral.findFirst({
            where:{
                email: session.user.email
            },
            select:{
                id: true
            }
        })
        if(!referralId){
            return NextResponse.json({message : "Referral not found"},{ status: 500 })
        }
        return NextResponse.json(referralId)
    }catch(error){
        return NextResponse.json({ message: "Internal server error" },{ status: 500 })
    }
}