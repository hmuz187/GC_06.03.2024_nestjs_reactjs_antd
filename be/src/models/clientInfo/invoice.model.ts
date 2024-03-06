import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';

import {Document, Schema as MongooseSchema } from 'mongoose';

const COLLECTION_NAME = 'Invoices'

@Schema({timestamps: true, collection:COLLECTION_NAME})
export class InvoiceModel extends Document {
    @Prop({ref: 'User'})
    invoice_owner: MongooseSchema.Types.ObjectId;

    @Prop({default: 0})
    invoice_totalPayment: Number;
    
    @Prop({enum: ['Paypal', 'Card', 'GooglePay', 'Payoo', 'Stripe'], default: '' })
    invoice_applyPayment: string;
    
    @Prop({ default: [] })
    invoice_detail: Array<any>; //any[]
    
    @Prop({enum: ['paid', 'none', 'check'], default: 'none'})
    invoice_status: string;
    
    @Prop({required: true, unique: true})
    invoice_orderId: string;
}

export const invoiceSchema = SchemaFactory.createForClass(InvoiceModel)