import { Module } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { RabbitMqController } from './rabbit-mq.controller';
import { RedisEmitterModule } from 'src/emitters/redis/redis-emitter.module';

@Module({
  controllers: [RabbitMqController],
  imports: [RedisEmitterModule],
})
export class RabbitMqModule {
  static getTransportOptions(): MicroserviceOptions {
    return {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'notifications_queue',
        queueOptions: {
          durable: false,
        },
      },
    };
  }
}
