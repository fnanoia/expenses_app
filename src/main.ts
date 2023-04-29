import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SERVER_PORT } from './config/const';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { UserModule } from './user/user.module';
import { IncomesModule } from './incomes/incomes.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //habilitar validaciones de forma global
  app.useGlobalPipes(new ValidationPipe());

  //swagger docs
  const docsOptions = new DocumentBuilder()
    .setTitle('API documentation')
    .setVersion('1.0.0')
    .addTag('products, users')
    .build();

  const document = SwaggerModule.createDocument(app, docsOptions, {
    include: [ UserModule, IncomesModule],
  });

  SwaggerModule.setup('/api/docs', app, document);

  //traigo config y env
  const configService = app.get(ConfigService);
  const port = +configService.get<number>(SERVER_PORT) || 3000;

  await app.listen(port);
  console.log(`listening on port ${await app.getUrl()}`);
}
bootstrap();
