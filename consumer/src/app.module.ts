import { Module } from '@nestjs/common';
// import { KafkaModule } from './kafka/kafka.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { RabbitMqModule } from './brokers/rmq/rabbit-mq.module';
import { RedisEmitterModule } from './emitters/redis/redis-emitter.module';
import { ConfigModule } from '@nestjs/config';

const selectedTransportModule = RabbitMqModule;
const selectedEmitterModule = RedisEmitterModule;

@Module({
  imports: [
    selectedTransportModule,
    selectedEmitterModule,
    ConfigModule.forRoot(),
  ],
})
export class AppModule {
  static getTransportOptions(): MicroserviceOptions {
    return selectedTransportModule.getTransportOptions(); // selected transport
  }
}
