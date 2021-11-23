import { Module, NestModule, MiddlewareConsumer, RequestMethod, } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose'
import { SentryModule } from '@ntegral/nestjs-sentry';
import { LogLevel } from '@sentry/types';

import { AuthenticationMiddleware , LoggerMiddleware } from './middleware'
@Module({
  imports: [ConfigModule.forRoot(), 
    ProductsModule , 
    MongooseModule.forRoot(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tfmkm.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`),
    SentryModule.forRoot({
      dsn: process.env.SENTRY_DSN,
      debug: true,
      environment: 'dev' || 'production',
      release: 'some_release' || null,
      logLevel: LogLevel.Debug
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');
      consumer
      .apply(AuthenticationMiddleware)
      .forRoutes({ path: 'products', method: RequestMethod.POST });
  }
}
