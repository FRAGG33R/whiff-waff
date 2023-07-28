import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import * as messages from 'src/shared/constants/constants.messages'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('api/v1');
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));  
  app.enableCors();
  const config = new DocumentBuilder().setTitle(messages.TITLE_DOCS).setDescription(messages.DESCRITPION_DOCS).setVersion('1.0').addTag('whiff-whaff').addBearerAuth().build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api', app, document, {
    swaggerOptions: {
      url: 'http://10.13.10.14:3000'
    },
  });
  await app.listen(3000);
}

bootstrap();
