import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
// import { HttpExceptionFilter } from './utils/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { SentryService } from '@ntegral/nestjs-sentry';
import * as cookieParser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const corsOption = {
    origin: [process.env.HOSTS]
  }
  app.enableCors(corsOption);

  const config = new DocumentBuilder()
  .setTitle('e-shop-api')
  .setDescription('The e-shop API description')
  .setVersion('1.0')
  .addTag('')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useLogger(app.get(SentryService));
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser())
  // app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();
