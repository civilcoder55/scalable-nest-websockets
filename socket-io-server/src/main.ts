import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RedisIoAdapter } from './adapters/redis-io.adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const adapter = new RedisIoAdapter(app);
  // const adapter = new MongoAdapter(app);
  // const adapter = new PostgresAdapter(app);

  await adapter.connect();
  app.useWebSocketAdapter(adapter);

  await app.listen(3000);
}
bootstrap();
