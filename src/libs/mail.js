import nodemailer from "nodemailer"

export async function sendVerificationMail(to, link, message){
    try{
        const transporter = nodemailer.createTransport({
            host: "mail.clubxtrim.com",
            port: 465,
            secure:"SSL",
            auth:{
                user: "notifications@clubxtrim.com",
                pass: "celularCom_202$**"
            }
        })

        const res = await transporter.sendMail({
            from: `"Club XTRIM" <notifications@clubxtrim.com>`,
            to,
            subject: "Info cuenta",
            html: message
        });
    }catch(error){
        console.log(error)
    }

}