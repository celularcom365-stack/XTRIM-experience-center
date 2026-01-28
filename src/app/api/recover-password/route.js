import { NextResponse } from "next/server";
import db from "@/libs/db";
import crypto from "crypto";
import { sendVerificationMail } from "@/libs/mail";

export async function POST(request){
    try{
        const data = await request.json();

        const foundUser =await db.user.findFirst({
            where:{
                email: data.email
            },
            select:{
                id: true,
                referredUser:{
                    select:{
                        id: true,
                        name: true
                    }
                }
            }
        })
        if(!foundUser){
            return NextResponse.json({message:"Usuario no encontrado", type:"fail"}, {status: 409})
        }
        await db.emailVerification.updateMany({
            where:{
                userId: foundUser.id
            },
            data:{
                used: true
            }
        })
        const token = crypto.randomBytes(32).toString("hex");

        await db.emailVerification.create({
            data:{
                userId: foundUser.id,
                token: token,
                expiresAt: new Date(Date.now() + 60 * 60 * 1000),
                used: false
            }
        })
        console.log(foundUser)
        const link = `http://localhost:3000/recover-password/new-password?token=${token}`;
        const message = `
        <h1>Hola ${foundUser.referredUser ? `${foundUser.referredUser.name}` : ""}👋</h1>
        <p>Restabler contraseña</p>
        <p>Haz clic en el siguiente enlace para cambiar tu contraseña:</p>
        <a href="${link}">Cambio de contraseña</a>
        <p>Este enlace expira en 1 hora</p>
        `
        const res = await sendVerificationMail(data.email, link, message);

        return NextResponse.json({message:`Ve a ${data.email} para continuar`, type:"success"}, {status: 201})

    }catch(error){
        NextResponse.json({message:error.message})
    }
}