import db from "@/libs/db"
import { NextResponse } from "next/server";
import { session } from "@/libs/auth";

export async function POST(request){

    try{
        const user = await session()

        const {email} = user.user

        const data = await request.json();

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

        const referralUserId = await db.user.findFirst({
            where:{
                email: data.email
            },
            select:{
                id: true
            }
        })

        const referralId = await db.referral.findFirst({
            where:{
                email: email
            },
            select:{
                id: true
            }
        })
        
        if(referralFoundByEmail){
            return NextResponse.json({error: "El correo electrónico ya está registrado"}, {status: 409})
        }if(referralFoundByPhone){
            return NextResponse.json({error: "El  número de telefono ya está registrado"}, {status: 409})
        }

        if(referralId == null && email != data.email) {
            return NextResponse.json({error: "Aun no ingresas tus datos"}, {status: 409})
        }

        const newReferral = await db.referral.create({
            data: {
                name: data.name,
                identification: data.identification,
                phone: data.phone,
                address: data.address,
                email: data.email,
                referredId: parseInt(referralUserId?.id) ?? null,
                parentId: parseInt(referralId?.id) ?? null
            }
        })
        const newReferralId = parseInt(newReferral.id)
        const newTreeFirstRegister = await db.tree.create({
            data:{
                ancestorId: newReferralId,
                descendantId: newReferralId,
                depth: 0
            }
        })
        if(referralId != null){
            const newTreeRegister = await db.$executeRaw`INSERT INTO "Tree" ("ancestorId", "descendantId", "depth", "updatedAt") SELECT "ancestorId", ${newReferralId} , depth+1, ${new Date()} FROM "Tree" WHERE "descendantId"=${parseInt(referralId.id)}`
        }
        

        return NextResponse.json(newReferral)
    }catch(error){
        return NextResponse.json({ message: error.message },{ status: 500 })
    }
}

export async function GET(request){
    try{
        const user = await session()
        const {email} = user.user

        const referralId = await db.referral.findFirst({
            where:{
                email: email
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