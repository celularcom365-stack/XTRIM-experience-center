import nodemailer from "nodemailer"

export async function sendVerificationMail(to, link, message){
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
            subject: "Info cuenta",
            html: message
        });
    }catch(error){
        console.log(error)
    }

}