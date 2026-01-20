import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import db from "@/libs/db"
import crypto from "crypto";
import { sendVerificationMail } from "@/libs/mail";

export async function POST(request) {
    try{
        const data = await request.json();

        const userFoundByUsername = await db.user.findUnique({
            where: {
                username: data.username
            }
        })

        const userFoundByEmail = await db.user.findUnique({
            where:{
                email: data.email
            }        
        })

        const referralFoundByEmail = await db.referral.findUnique({
            where:{
                email: data.email
            }
        })

        if(userFoundByUsername){
            return NextResponse.json({error: "El nombre de usuario ya está en uso"}, {status: 409})
        }if(userFoundByEmail){
            return NextResponse.json({error: "El correo electrónico ya está registrado"}, {status: 409})
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const newUser =await db.user.create({
            data:{
                username: data.username,
                email: data.email,
                password: hashedPassword
            }
        })

        if(newUser){
            const token = crypto.randomBytes(32).toString("hex");

            const verify = await db.emailVerification.create({
                data:{
                    userId: newUser.id,
                    token: token,
                    expiresAt: new Date(Date.now() + 60 * 60 * 1000),
                    used: false
                }
            })
            const link = `http://localhost:3000/verify-email?token=${token}`;
            const res = await sendVerificationMail(data.email, link);

            if(referralFoundByEmail){
                await db.referral.update({
                    where:{
                        email: data.email
                    },
                    data:{
                        referredId: parseInt(newUser.id)
                    }
                })
            }
        }

        const {password: _, ...user} = newUser
        return NextResponse.json(user)
    }catch(error){
        return NextResponse.json({message: error.message}, {status: 500})
    }
}