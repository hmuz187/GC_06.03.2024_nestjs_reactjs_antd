import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";

@Injectable()
export class CheckPermission implements NestMiddleware{
    use(req: any, res: any, next: (error?: any) => void) {
        console.log(req.headers)
        if(req.headers && req.headers.permission && req.headers.permission === '0000') return next()
        else throw new HttpException(`you're not allow to access this`, HttpStatus.UNAUTHORIZED)
        if(!req.headers) throw new HttpException(`you're not allow to access this`, HttpStatus.UNAUTHORIZED)
    }
}