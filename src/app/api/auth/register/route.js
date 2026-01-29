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
            return NextResponse.json({message: "El nombre de usuario ya está en uso", type: "error"}, {status: 409})
        }if(userFoundByEmail){
            return NextResponse.json({message: "El correo electrónico ya está registrado", type: "error"}, {status: 409})
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const newUser =await db.user.create({
            data:{
                username: data.username,
                email: data.email,
                password: hashedPassword
            }
        })

        if(!newUser){
            return NextResponse.json({message: "Error al crear el usuario", type: "error"}, {status:401})
        }
        const token = crypto.randomBytes(32).toString("hex");

        const verify = await db.emailVerification.create({
            data:{
                userId: newUser.id,
                token: token,
                expiresAt: new Date(Date.now() + 60 * 60 * 1000),
                used: false
            }
        })
        const link = `https://app.clubxtrim.com/verify-email?token=${token}`;
        const message = `
        <h1>Hola 👋</h1>
        <p>Gracias por registrarte</p>
        <p>Haz clic en el siguiente enlace para confirmar tu email:</p>
        <a href="${link}">Confirmar cuenta</a>
        <p>Este enlace expira en 1 hora</p>
        `
        const res = await sendVerificationMail(data.email, link, message);

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

        const {password: _, ...user} = newUser
        return NextResponse.json({message: "Usuario creado exitosamente", type: "success"}, {status:201})
    }catch(error){
        return NextResponse.json({message: error.message}, {status: 500})
    }
}