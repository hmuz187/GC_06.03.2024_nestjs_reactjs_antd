import * as JWT from 'jsonwebtoken';
import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { KeyTokenService } from "src/modules/client/access/keyToken.service";

export const HEADER = {
    CLIENT_ID: 'h-client-id',
    AUTHORIZATION: 'authorization', //accesstoken
    REFRESHTOKEN: 'h-rtoken-id'
} 

@Injectable()
export class CheckAuthentication implements NestMiddleware{

    constructor(private keyTokenService: KeyTokenService){}

    async use(req: any, res: any, next: (error?: any) => void) {
        const userId = req.headers[HEADER.CLIENT_ID];
        if(!userId) throw new HttpException(`you're not allow to access this`, HttpStatus.UNAUTHORIZED);

        const keyUser = await this.keyTokenService.findByUserId(userId);
        if(!keyUser) throw new HttpException(`Not Found KeyUser!`, HttpStatus.NOT_FOUND);

        if(req.headers[HEADER.REFRESHTOKEN]){
            try{
                const refreshToken = req.headers[HEADER.REFRESHTOKEN]
                const decodeUser = JWT.verify(refreshToken, keyUser.privateKey)
                if(userId !== decodeUser.userId) throw new HttpException(`Invalid request`, HttpStatus.UNAUTHORIZED);
                req.keyUser = keyUser
                req.user = decodeUser
                req.refreshToken = refreshToken

                return next()
            } catch(error){
                throw (error)
            }
    }

    const accessToken = req.headers[HEADER.AUTHORIZATION]
    if(!accessToken) throw new HttpException(`Invalid request`, HttpStatus.UNAUTHORIZED);

    try{
        const decodeUser = JWT.verify(accessToken, keyUser.publicKey)
        if(userId !== decodeUser.userId) throw new HttpException(`Invalid request`, HttpStatus.UNAUTHORIZED);
        req.keyUser = keyUser
        req.user = decodeUser
        return next()
    }catch(error){
        throw error
    }
    }
}