import { Module } from '@nestjs/common';
import { DatabaseModule } from './providers/database/database.module.';
import { AccessModule } from './modules/client/access/access.module';
import { PostModule } from './modules/client/post/post.module';
import { ProductModule } from './modules/client/product/product.module';


@Module({
  imports: [
    DatabaseModule,
    AccessModule,
    PostModule,
    ProductModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}


