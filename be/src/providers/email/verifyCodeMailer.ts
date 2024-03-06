import {MailerService} from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { configDotenv } from 'dotenv';


configDotenv();
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;


@Injectable()
export class MailService {

    constructor(private readonly mailerService: MailerService) { }

    async sendMail({userEmail, code, roleMessage}) : Promise<any> {
        try {
            var adminEmail = ADMIN_EMAIL
    
            let info = await this.mailerService.sendMail({
                from: `"DApp Group " <${adminEmail}>`,  
                to: `${userEmail}`,
                subject: `${roleMessage} verify Code`,
                html: `<h2>Thank you very much</h2><h3>Here is the code: ${code}</h3>`,
            });
    
            return ({status: 'ok', messageId: info.messageId})

        } catch (error) {
            return ({status: 'error', messageId: null})    
        }
    }
}