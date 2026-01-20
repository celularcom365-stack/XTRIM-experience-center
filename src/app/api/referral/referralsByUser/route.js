import db from "@/libs/db"
import { NextResponse } from "next/server";
import { session } from "@/libs/auth";

export async function GET(request){
    try{
        const currentSession = await session()
        const {email} = currentSession.user

        const referral = await db.referral.findFirst({
            where:{
                email
            }
        })
        if(referral == null){
            return NextResponse.json({message : "Referral not found"},{ status: 400 })
        }
        const referralId = parseInt(referral.id)
        const referralsXUser = await db.referral.findMany({
            where:{
                parentId: referralId
            },
            select:{
                id: true,
                name: true,
                phone: true,
                identification: true,
                address: true,
                email: true,
                state: true,
                referral: {
                    select:{
                        id: true,
                        name: true,
                        phone: true,
                        identification: true,
                        address: true,
                        email: true,
                        state: true,
                    }
                },
                _count:{
                    select:{referral: true}
                }
            }
        })
        console.log(referralsXUser)
        if(referralsXUser == null){
            return NextResponse.json({message : "Referrals not found"},{ status: 400 })
        }
       return NextResponse.json(referralsXUser)
    }catch(error){

    }
}