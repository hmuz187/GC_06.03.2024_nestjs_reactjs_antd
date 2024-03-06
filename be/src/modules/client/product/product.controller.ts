import { Controller, Get } from '@nestjs/common';

@Controller('v1/product')
export class ProductController {

    @Get()
    root(){
        return 'hello product here'
    }
}
