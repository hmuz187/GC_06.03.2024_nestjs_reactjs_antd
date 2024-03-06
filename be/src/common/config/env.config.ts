import {configDotenv} from 'dotenv'

// export const envConfig = () : EnvConfig => {
//     const mode = process.env.NODE_ENV;
//     // if(!mode || mode === '')
// }

export interface EnvConfig {
    mode: string;
    port: number;
    serverUrl: string;
    clientUrl: string;
    mongodbUri: string;
    sessionSecret: string;
    cookieSecret:string;
    jwt: {
        jwtSecret: string;
        jwtExpiredTime: number;
        jwtRefreshSecret: string;
        jwtRefreshExpiredTime: number;
    },
    auth?:{
        facebookAppId: string;
        facebookAppSecret: string;
        googleAppId: string;
        googleAppSecret: string;
    },
    email:{
        clientId: string;
        clientSecret: string;
        redirectUri: string;
        refreshToken: string;
        adminEmail: string;
    },
    cloudinary:{
        cloudName: string;
        apiKey: string;
        secret: string;
    }
}