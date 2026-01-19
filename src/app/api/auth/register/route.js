import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import db from "@/libs/db"

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
        const {password: _, ...user} = newUser
        return NextResponse.json(user)
    }catch(error){
        return NextResponse.json({message: error.message}, {status: 500})
    }
}