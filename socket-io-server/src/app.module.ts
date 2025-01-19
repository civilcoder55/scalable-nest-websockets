import { Module } from '@nestjs/common';
import { SocketModule } from './socket/socket.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [SocketModule, ConfigModule.forRoot()],
})
export class AppModule {}
