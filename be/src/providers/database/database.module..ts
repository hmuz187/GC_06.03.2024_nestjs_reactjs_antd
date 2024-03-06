import { Module } from "@nestjs/common";
import {MongooseModule} from '@nestjs/mongoose';
import { configDotenv } from "dotenv";

configDotenv();

@Module({
    imports: [MongooseModule.forRoot(`${process.env.MONGODB_URL}`)],
})

export class DatabaseModule {}