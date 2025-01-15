import { Module } from '@nestjs/common';
import { KafkaController } from './kafka.controller';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

@Module({
  controllers: [KafkaController],
})
export class KafkaModule {
  static getTransportOptions(): MicroserviceOptions {
    return {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['localhost:9092'],
        },
        consumer: {
          groupId: 'socket-consumer',
        },
      },
    };
  }
}
