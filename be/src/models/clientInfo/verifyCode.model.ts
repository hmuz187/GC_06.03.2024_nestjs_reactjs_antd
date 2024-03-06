import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { Document} from 'mongoose';

export const COLLECTION_NAME = 'VerifyCodes'

@Schema({timestamps: true, expireAfterSeconds: 600, collection: COLLECTION_NAME})
export class VerifyCodeModel extends Document {
    @Prop({required: true, unique: true})
    email: string;
    
    @Prop({required: true})
    code: string;

    @Prop({ enum: ['signup', 'signin', 'forgotPassword', 'changePassword', 'payment', 'checkingPayment', 'ask'],  default:'signup'})
    role: string;

    @Prop({expires: 600, default: Date.now})
    createAt: Date;
}

export const verifyCodeSchema = SchemaFactory.createForClass(VerifyCodeModel)