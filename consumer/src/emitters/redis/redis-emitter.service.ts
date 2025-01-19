import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Emitter } from '@socket.io/redis-emitter';
import { createClient } from 'redis';

@Injectable()
export class RedisEmitterService implements OnModuleInit {
  private readonly logger = new Logger(RedisEmitterService.name);
  private readonly redisClient = createClient({
    url: process.env.REDIS_URL,
  });
  public readonly emitter: Emitter = new Emitter(this.redisClient);

  async onModuleInit() {
    await this.redisClient.connect();
    this.logger.log('Redis Client Connected');
  }
}
