import db from "@/libs/db"
import { NextResponse } from "next/server";
import { session } from "@/libs/auth";
import { verify } from "@/libs/identification"
import { verifyPhone } from "@/libs/phone";

export async function POST(request){

    try{
        const user = await session()

        const {email} = user.user

        const data = await request.json();

        const referralId = await db.referral.findFirst({
            where:{
                email: email
            },
            select:{
                id: true
            }
        })
        if(referralId == null && email != data.email) {
            return NextResponse.json({message: "Aun no ingresas tus datos", type:"error"}, {status: 409})
        }

        const referralFoundByEmail = await db.referral.findFirst({
            where:{
                email: data.email
            }        
        })
        if(referralFoundByEmail){
            return NextResponse.json({message: "El correo electrónico ya está registrado", type:"error"}, {status: 409})
        }

        const trueECIdentification = verify(data.identification)
        if(!trueECIdentification){
            return NextResponse.json({message: "No es una cedula ecuatoriana", type:"error"}, {status: 409})
        }

        const referralFoundByPhone = await db.referral.findFirst({
            where:{
                phone: data.phone
            }        
        })
        if(referralFoundByPhone){
            return NextResponse.json({message: "El  número de telefono ya está registrado", type:"error"}, {status: 409})
        }

        const trueECPhone = verifyPhone(data.phone)
        if(!trueECPhone){
            return NextResponse.json({message: "No es un telefono válido", type:"error"}, {status: 409})
        }

        const referralUserId = await db.user.findFirst({
            where:{
                email: data.email
            },
            select:{
                id: true
            }
        })

        const newReferral = await db.referral.create({
            data: {
                name: data.name,
                identification: data.identification,
                phone: data.phone,
                latitude: (data.lat).toString(),
                longitude: (data.lng).toString(),
                email: data.email,
                referredId: parseInt(referralUserId?.id) ?? null,
                parentId: parseInt(referralId?.id) ?? null
            }
        })
        const newReferralId = parseInt(newReferral.id)


        if(referralUserId){
            const bonus = await db.bonus.create({
                data:{
                    type: "WELCOME",
                    beneficiaryId: newReferralId,
                    amount:parseInt(10),
                    state: "GRANTED"
                }
            })
        }

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
        
        
        return NextResponse.json({message: "Creado Exitosamente", type:"success"}, {status:201})
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
            return NextResponse.json({message : "Referral not found", email},{ status: 500 })
        }
        return NextResponse.json(referralId)
    }catch(error){
        return NextResponse.json({ message: "Internal server error" },{ status: 500 })
    }
}