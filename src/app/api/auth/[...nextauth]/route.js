import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import db from "@/libs/db"
import bcrypt from 'bcrypt'

export const authOptions = {
    providers:[
        CredentialsProvider({
            name: "Credenciales",
            credentials: {
                email: { 
                    label: "Usuario", type: "text", placeholder: "usuario123"},
                password: {
                    label: "Contraseña", type: "password", placeholder: "********"}
            },
            async authorize(credentials, req){
                const userFound = await db.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })
                if(!userFound) throw new Error(JSON.stringify({message: 'Usuario no encontrado'}))
                const passwordMatch = await bcrypt.compare(credentials.password, userFound.password)
                if(!passwordMatch) throw new Error(JSON.stringify({message: 'Contraseña incorrecta'}))
                if(!userFound.emailVerified) throw new Error(JSON.stringify({message: 'Usuario no verificado'}))
                
                return {
                    id: userFound.id,
                    name: userFound.username,
                    email: userFound.email
                }
            }
        })
    ],
    callbacks:{
        async jwt({ token, user }) {
        // Se ejecuta SOLO al iniciar sesión
        if (user) {
            token.id = user.id
            token.referralId = user.referralId
        }
        return token
        },

        async session({ session, token }) {
        // Esto es lo que llega al frontend y backend
        session.user.id = token.id
        session.user.referralId = token.referralId
        return session
        }
    },
    pages:{
        signIn: "/auth/login"
    }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }