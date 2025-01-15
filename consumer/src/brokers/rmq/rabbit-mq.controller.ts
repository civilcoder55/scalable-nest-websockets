import { Controller, Logger } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { RedisEmitterService } from 'src/emitters/redis/redis-emitter.service';

@Controller()
export class RabbitMqController {
  readonly logger = new Logger(RabbitMqController.name);

  constructor(private readonly redisEmitterService: RedisEmitterService) {}

  @EventPattern('notification')
  emitToSocketIo(data: any): void {
    this.logger.log(`Emitting to socket.io: ${JSON.stringify(data)}`);

    this.redisEmitterService.emitter.emit('notification', data);
  }
}
