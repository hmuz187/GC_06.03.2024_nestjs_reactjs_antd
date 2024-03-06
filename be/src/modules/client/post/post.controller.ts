import { Controller, Get } from '@nestjs/common';

@Controller('v1/post')
export class PostController {

    @Get()
    root(){
        return 'Hello, post here'
    }
}
