import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
@Module({
  imports: [ConfigModule.forRoot(), ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}