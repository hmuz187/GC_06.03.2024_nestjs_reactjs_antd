import { Get, MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { AccessController } from "./access.controller";
import { AccessService } from "./access.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModel, userSchema } from "src/models/clientInfo/user.model";
import { VerifyCodeModel, verifyCodeSchema } from "src/models/clientInfo/verifyCode.model";
import { KeyTokenModel, keyTokenSchema } from "src/models/clientInfo/keyToken.model";
import { InvoiceModel, invoiceSchema } from "src/models/clientInfo/invoice.model";
import { KeyTokenService } from "./keyToken.service";
import { CheckPermission } from "src/middleware/checkPermission";
import { CheckAuthentication } from "src/middleware/checkAuth";
import { MailModule } from "src/providers/email/mail.module";
import { MailService } from "src/providers/email/verifyCodeMailer";

@Module({
    imports:[
        MongooseModule.forFeature([
            {name: UserModel.name, schema: userSchema},
            {name: VerifyCodeModel.name, schema: verifyCodeSchema},
            {name: KeyTokenModel.name, schema: keyTokenSchema},
            {name: InvoiceModel.name, schema: invoiceSchema}
        ]),
    ],
    controllers:[AccessController],
    providers: [AccessService, KeyTokenService]
})

export class AccessModule{
    configure(consumer: MiddlewareConsumer) {
        // consumer
        // .apply(CheckPermission)
        // .forRoutes('v1/access');
        consumer
        .apply(CheckAuthentication)
        .forRoutes('v1/access/logout');
    }
}