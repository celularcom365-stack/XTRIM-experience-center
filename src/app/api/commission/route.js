import db from "@/libs/db"
import { NextResponse } from "next/server";
import { session } from "@/libs/auth";

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

        const bonus = await db.bonus.findMany({
            where:{
                beneficiaryId: referralId.id
            }
        })
        const commissions = await db.commission.findMany({
            where: {
                beneficiaryId: referralId.id
            }
        })

        if(bonus.length == 0 || commissions.length == 0){
            NextResponse.json({message : "Payments not found", email},{ status: 500 })
        }
        return NextResponse.json({bonus: bonus, commissions : commissions})
    }catch(error){
        return NextResponse.json({ message: "Internal server error" },{ status: 500 })
    }
}