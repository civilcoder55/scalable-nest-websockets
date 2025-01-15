import { Module } from '@nestjs/common';
import { RedisEmitterService } from './redis-emitter.service';

@Module({
  providers: [RedisEmitterService],
  exports: [RedisEmitterService],
})
export class RedisEmitterModule {}
