import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModel, userSchema } from "src/models/clientInfo/user.model";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";

@Module({
    imports:[
        MongooseModule.forFeature([
            {name: UserModel.name, schema: userSchema}
        ])
    ],
    controllers:[ProductController],
    providers: [ProductService],
    exports: [ProductService]
})

export class ProductModule{}