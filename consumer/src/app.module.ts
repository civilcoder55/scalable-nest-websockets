import { Module } from '@nestjs/common';
// import { KafkaModule } from './kafka/kafka.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { RabbitMqModule } from './brokers/rmq/rabbit-mq.module';
import { RedisEmitterModule } from './emitters/redis/redis-emitter.module';

const selectedTransportModule = RabbitMqModule;
const selectedEmitterModule = RedisEmitterModule;

@Module({
  imports: [selectedTransportModule, selectedEmitterModule],
})
export class AppModule {
  static getTransportOptions(): MicroserviceOptions {
    return selectedTransportModule.getTransportOptions(); // selected transport
  }
}
