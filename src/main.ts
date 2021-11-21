import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';


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

  await app.listen(3000);
}
bootstrap();
