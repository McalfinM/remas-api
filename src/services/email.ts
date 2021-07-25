import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { v4 as uuidv4 } from 'uuid'
import { events } from "../events/events";
import { EventDispatcher } from "event-dispatch";
import { ILikeRepository } from "../repositories/interfaces/like";
import { IEmailService } from "./interfaces/email";
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()
@injectable()
class EmailService implements IEmailService {

    constructor(
        @inject(TYPES.ProducerDispatcher) private dispatcher: EventDispatcher,
    ) { }

    async sendEmailVerificationAccout(token: string, email: string): Promise<{ success: true }> {

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            port: 465,
            auth: {
                user: 'ir.arrahmah@gmail.com',
                pass: 'ogkfkvfaqitfqdes'
            }
        });

        var mailOptions = {
            from: 'ir.arrahmah@gmail.com',
            to: email,
            subject: 'Verification Account Remaja Masjid',
            html: '<p>Selamat Datang di Remaja Masjid Silahkan Klik Link berikut untuk konfirmasi akun anda</p>' + `<a href='${process.env.BASE_URL} /token/${token}/verification'>Link Verifikasi</a>`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        })
        return { success: true }
    }

}

export default EmailService
