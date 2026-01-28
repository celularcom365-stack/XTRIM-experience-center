import db from "@/libs/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request){
    try{
        const data = await request.json()

        const validToken = await db.emailVerification.findFirst({
            where: {
                token: data.token,
                used: false
            }
        })
        if(!validToken){
            return NextResponse.json({message: "Token Invalido", type: "error"}, {status: 401})
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const newUser =await db.user.update({
            where:{
                id: validToken.userId
            },
            data:{
                password: hashedPassword
            }
        })
        await db.emailVerification.update({
            where:{
                id: validToken.id
            },
            data:{
                used: true
            }
        })
        if(newUser) return NextResponse.json({message: "Actualizado con exito", type: "success"}, {status: 200})
        

    }catch(error){
        return NextResponse.json({error: error.message}, {status: 500})
    }
}