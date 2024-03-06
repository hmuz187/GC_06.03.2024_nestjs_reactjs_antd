import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

export const COLLECTION_NAME = 'Users'

@Schema({timestamps: true, collection: COLLECTION_NAME})
export class UserModel extends Document {
    @Prop({required: true, maxlength: 255})
    username: string;

    @Prop({required: true, maxlength: 255, unique: true})
    email: string;

    @Prop({required: true})
    password: string;

    @Prop()
    passwordVerifyToken?: string;

    @Prop({default: Date.now})
    passwordResetExpire?: Date;

    @Prop({enum: ['c1', 'c2', 'c3'], default: 'c1'}) //c3: admin, c2: writer, c3: user
    roles: string; 
    
    @Prop({enum: ['active', 'inactive'], default: 'active'})
    status: string; 
    
    @Prop({default: [] })
    cart: Array<any>;  //orderID
    
    @Prop({default: 0})
    totalPaid: Number;

    @Prop({default: []})
    applyPayment: Array<any>;  //any[]; 
}

export const userSchema = SchemaFactory.createForClass(UserModel);

export const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

