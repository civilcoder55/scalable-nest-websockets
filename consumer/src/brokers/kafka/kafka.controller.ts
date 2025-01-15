import { Controller, Logger } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class KafkaController {
  readonly logger = new Logger(KafkaController.name);

  @EventPattern('notification')
  emitToSocketIo(data: any): void {
    this.logger.log(`Emitting to socket.io: ${JSON.stringify(data)}`);
  }
}
