import nodemailer from "nodemailer"

export async function sendVerificationMail(to, link){
    try{
        const transporter = nodemailer.createTransport({
            host: "mail.celularcom.net",
            port: 465,
            secure:"SSL",
            auth:{
                user: "p.mendez@celularcom.net",
                pass: "Celularcom2025."
            }
        })

        const res = await transporter.sendMail({
            from: `"Club XTRIM" <p.mendez@celularcom.net>`,
            to,
            subject: "Confirma tu cuenta",
            html: `
            <h1>Hola 👋</h1>
            <p>Gracias por registrarte</p>
            <p>Haz clic en el siguiente enlace para confirmar tu email:</p>
            <a href="${link}">Confirmar cuenta</a>
            <p>Este enlace expira en 1 hora</p>
            `
        });
        console.log(res)
    }catch(error){
        console.log(error)
    }

}