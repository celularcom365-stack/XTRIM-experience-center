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
        if(userFoundByUsername){
            return NextResponse.json({message: "El nombre de usuario ya está en uso", type: "error"}, {status: 409})
        }

        const userFoundByEmail = await db.user.findUnique({
            where:{
                email: data.email
            }        
        })
        if(userFoundByEmail){
            return NextResponse.json({message: "El correo electrónico ya está registrado", type: "error"}, {status: 409})
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);
        const token = crypto.randomBytes(32).toString("hex");

        const result = await db.$transaction(async (tx) => {

            const newUser =await tx.user.create({
                data:{
                    username: data.username,
                    email: data.email,
                    password: hashedPassword
                }
            })

            await tx.emailVerification.create({
                data:{
                    userId: newUser.id,
                    token: token,
                    expiresAt: new Date(Date.now() + 60 * 60 * 1000),
                    used: false
                }
            })

            await tx.termsAcceptance.create({
                data:{
                    userId: newUser.id,
                    termsVersion: "2026-01",
                    privacyVersion: "2026-01",
                    ipAddress: request.headers.get("x-forwarded-for"),
                    userAgent: request.headers.get("user-agent"),
                    acceptedAt: new Date()
                }
            })

            const referralFoundByEmail = await tx.referral.findUnique({
                where:{
                    email: data.email
                }
            })

            if(referralFoundByEmail){
                await tx.referral.update({
                    where:{
                        email: data.email
                    },
                    data:{
                        referredId: parseInt(newUser.id)
                    }
                })
            }

            return {newUser}

        })

        
        const link = `https://app.clubxtrim.com/auth/verify-email?token=${token}`;
        const message = `
        <h1>Hola 👋</h1>
        <p>Gracias por registrarte</p>
        <p>Haz clic en el siguiente enlace para confirmar tu email:</p>
        <a href="${link}">Confirmar cuenta</a>
        <p>Este enlace expira en 1 hora</p>
        `
        await sendVerificationMail(data.email, link, message);

        return NextResponse.json({message: "Usuario creado, revisa tu correo", type: "success"}, {status:201})
    }catch(error){
        return NextResponse.json({message: error.message}, {status: 500})
    }
}