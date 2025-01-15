import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.init();

  app.connectMicroservice<MicroserviceOptions>(AppModule.getTransportOptions());
  await app.startAllMicroservices();
}

bootstrap();
