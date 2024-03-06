import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModel, userSchema } from "src/models/clientInfo/user.model";
import { PostController } from "./post.controller";
import { PostService } from "./post.service";

@Module({
    imports:[
        MongooseModule.forFeature([
            {name: UserModel.name, schema: userSchema}
        ])
    ],
    controllers:[PostController],
    providers: [PostService],
    exports: [PostService]
})

export class PostModule{}