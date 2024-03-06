import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

const COLLECTION_NAME = 'KeyTokens'

@Schema({timestamps: true, collection: COLLECTION_NAME})
export class KeyTokenModel extends Document{
    @Prop({required: true})
    user: MongooseSchema.Types.ObjectId;

    @Prop({required: true})
    privateKey: string;
    
    @Prop({required: true})
    publicKey: string;
    
    @Prop({default: []})
    refreshTokenUsed: Array<any>;
    
    @Prop({required: true})
    refreshToken: string;
}

export const keyTokenSchema = SchemaFactory.createForClass(KeyTokenModel);