import { 
    HttpCode,
    HttpStatus,
    Controller, 
    Post, 
    Request,
    Body,
    Get,
    Render,
} from '@nestjs/common';

import {AccessService} from './access.service'

@Controller('v1/access')    // @Controller({path:'v1/access'})
export class AccessController {

    constructor(
        private accessService : AccessService
    ){}

    @Get()
    @Render('index')
    checkRoute(){
        return {
            message:`hello, i'm API Access`
        }
    }

    @Post('signup/getverifycode')
    async signUpGetVerifyCode(@Body() body){
        return await this.accessService.signUpGetVerifyCode(body)
    }

    @Post('signup')
    async signUp(@Body() body){
        return await this.accessService.signUp(body)
    }

    @Post('signin')
    async signIn(@Body() body){
        return await this.accessService.signIn(body)
    }

    @Post('forgotPassword/getVerifyCode')
    async forgotPassword_getCode(@Body() body){
        return await this.accessService.forgotPassword_getCode(body)
    }

    @Post('forgotPassword')
    async forgotPassword(@Body() body){
        return await this.accessService.forgotPassword(body)
    }

    @Post('logout')
    async logOut(@Request() req){
        return await this.accessService.logOut(req)
    }
}
