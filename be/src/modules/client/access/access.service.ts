import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserModel } from 'src/models/clientInfo/user.model';
import { VerifyCodeModel } from 'src/models/clientInfo/verifyCode.model';
import { KeyTokenModel } from 'src/models/clientInfo/keyToken.model';
import { KeyTokenService } from './keyToken.service';
import { createTokenPair } from 'src/common/utils/token.auth';
import { getInfoData } from 'src/common/utils/index.lodash';
import { sendMail } from 'src/providers/email/verifyCode.mail';


@Injectable()
export class AccessService {

    constructor(
        @InjectModel(UserModel.name) private userModel:Model<UserModel>,
        @InjectModel(VerifyCodeModel.name) private verifyCodeModel:Model<VerifyCodeModel>,
        @InjectModel(KeyTokenModel.name) private keyTokenModel:Model<KeyTokenModel>,
        private keyTokenService: KeyTokenService
    ){}


    signUp = async ({ username, email, password, verifyCode }):Promise<any> => {

    /*
    async signUp1({ username, email, password, verifyCode }) :Promise<User> {
        const passwordHash:string = await bcrypt.hash(password, 10)
        const newUser:User = await this.userModel.create({ username, email, password: passwordHash })
        return newUser
    }
    */

        const holderUser = await this.userModel.findOne({ email }).lean();
        if (holderUser) throw new BadRequestException(`Error: User is already sign up!`);

        const holderVerifyCode = await this.verifyCodeModel.findOne({ email }).lean();
        if(!holderVerifyCode) throw new BadRequestException(`please get verifyCode again!!!`)
        if (holderVerifyCode.code !== verifyCode) throw new BadRequestException(`Invalid verify Code`);

        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = await this.userModel.create({ username, email, password: passwordHash });

        if (!newUser) {
            return {
                code: HttpStatus.OK,
                metadata: null
            }
        }

        const privateKey = crypto.randomBytes(64).toString('hex');
        const publicKey = crypto.randomBytes(64).toString('hex');

        const userId = newUser._id

        //creat accessToken, refreshToken && save to database keyToken && return publicKey ====> keyUser = publicKey
        const keyUser = await this.keyTokenService.createKeyToken({ userId:userId, privateKey:privateKey, publicKey:publicKey, refreshToken:null });

        if (!keyUser) throw new BadRequestException(`KeyUser is error!!!`)

        //decode token
        const token = await createTokenPair({ payload: { userId: newUser._id, email }, privateKey, publicKey })

        return {
            code: HttpStatus.CREATED,
            message: `Signup successful!!!`,
            metadata: {
                user: getInfoData({ fields: ['_id', 'username', 'email', 'cart', 'totalPaid', 'applyPayment'], object: newUser }),
                token
            }
        }
    }



    signUpGetVerifyCode = async ({ userEmail }) => {

        
        const holderUser = await this.userModel.findOne({ email: userEmail }).lean();
        if (holderUser) throw new BadRequestException(`Error: User is already sign up!`);

        const hashCode = crypto.randomBytes(3).toString('hex');

        const infoSendMail = await sendMail({ userEmail, code: hashCode, roleMessage: `Sign up` });

       
        if(!infoSendMail || (infoSendMail && infoSendMail.status==='error')) return ({
            messageId: null,
            status: 'error',
        })

        const filter = { email: userEmail };
        const update = { code: hashCode, role: 'signup' };
        const options = { upsert: true, new: true };

        const codeUser = await this.verifyCodeModel.findOneAndUpdate(filter, update, options);

        if (!codeUser) {
            return (
                {
                    verifyCode: null,
                    message: 'error sending to your mail!!! Please try again or check your informations'
                }
            )
        }

        return ({
            messageId: infoSendMail,
            userEmail
        })


        
    }



    signIn = async ({ email, password }) : Promise<any>=> {

        const holderUser = await this.userModel.findOne({ email }).lean();
        if (!holderUser) throw new BadRequestException(`Error: User is not sign up! Please SIGN UP`);

        const verifyPassword = await bcrypt.compare(password, holderUser.password);

        if (!verifyPassword) throw new HttpException(`Authentication Error`, HttpStatus.UNAUTHORIZED);

        const privateKey = crypto.randomBytes(64).toString('hex');
        const publicKey = crypto.randomBytes(64).toString('hex');

        const token = await createTokenPair({ payload: { userId: holderUser._id, email }, privateKey, publicKey })

        await this.keyTokenService.createKeyToken({
            userId: holderUser._id,
            privateKey, publicKey, refreshToken: token.refreshToken,
        })

        return {
            code: HttpStatus.CREATED,
            message: `Signin Successful`,
            metadata: {
                user: getInfoData({ fields: ['_id', 'username', 'email', 'cart', 'totalPaid', 'applyPayment'], object: holderUser }),
                token
            }
        }

    }

    logOut = async (keyUser) => {

        /*
        console.log(keyUser)
        const delKey = await KeyTokenService.removeKeyByUserId(keyUser._id)
        return delKey

        */
    }

    forgotPassword_getCode = async ({ userEmail }) => {

        //sending mail
        const holderUser = await this.userModel.findOne({ email: userEmail }).lean();
        if (!holderUser) throw new BadRequestException(`Error: User is not sign up! Please SIGN UP`);

        const hashCode = crypto.randomBytes(3).toString('hex');

        //console.log(hashCode)

        const infoSendMail = await sendMail({ userEmail, code: hashCode, roleMessage: `Forgot Password ` });

        // update password in userModel
        const filter = { email: userEmail };
        const update = { code: hashCode, role: 'forgotPassword' };
        const options = { upsert: true, new: true };

        const codeUser = await this.verifyCodeModel.findOneAndUpdate(filter, update, options);

        if (!codeUser) {
            return (
                {
                    verifyCode: null,
                    message: 'error sending to your mail!!! Please try again or check your informations'
                }
            )
        }

        return ({
            messageId: infoSendMail,
            userEmail
        })
    }

    forgotPassword = async ({ userEmail, password, verifyCode }) => {
        //check email
        const holderUser = await this.userModel.findOne({ email: userEmail }).lean()
        if (!holderUser) throw new BadRequestException(`Error: User is not sign up! Please SIGN UP`);


        const holderVerifyCode = await this.verifyCodeModel.findOne({ email: userEmail }).lean()

        if (holderVerifyCode.code !== verifyCode) throw new BadRequestException(`Invalid verify Code`);

        const passwordHash = await bcrypt.hash(password, 10)

        //change Password
        const filter = { email: userEmail }
        const update = { password: passwordHash }
        const options = { upsert: true, new: true }

        const updateUser = await this.userModel.findOneAndUpdate(filter, update, options)

        if (!updateUser) {
            return (
                {
                    code: 200,
                    message: 'error updating your password!!! Please try again or check your information',
                    metadata: null
                }
            )
        }

        return ({
            code: 201,
            metadata: {
                user: getInfoData({ fields: ['_id', 'username', 'email', 'cart', 'totalPaid', 'applyPayment'], object: updateUser }),
            }
        })
    }
}
