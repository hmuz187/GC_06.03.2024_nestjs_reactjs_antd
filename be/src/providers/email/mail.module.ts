import { MailerModule } from "@nestjs-modules/mailer";
import { Module } from "@nestjs/common";
import {google} from 'googleapis';
import { configDotenv } from 'dotenv';


configDotenv();
const CLIENT_ID = process.env.GOOGLE_OAUTH_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;
const REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });




@Module({
    imports:[
        MailerModule.forRoot({
            transport:{
                service: "gmail",
                auth: {
                    type: "OAuth2",
                    user: ADMIN_EMAIL,
                    clientId: CLIENT_ID,
                    clientSecret: CLIENT_SECRET,
                    refreshToken: REFRESH_TOKEN,
                    accessToken: oAuth2Client.getAccessToken(),
                }
            }
        })
    ]
})

export class MailModule{}





/*
transport: {
    service: 'gmail',
    secure: false,
    auth: {
      type: 'OAuth2',
      user: process.env.GOOGLE_SENDER_EMAIL,
      clientId: process.env.GOOGLE_CLIENT,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
    },
  },
  defaults: {
    from: '"ABC" <abc@gmail.com>',
  },
  template: {
    dir: join(__dirname, 'emails/templates'),
    adapter: new HandlebarsAdapter(),
    options: {
      strict: true,
    },
  },
}),

*/