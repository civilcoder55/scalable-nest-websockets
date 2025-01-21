import { Inject, Module, OnModuleInit } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { ClientProxy, ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  providers: [SocketGateway],
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'SOCKET_CLIENT_PRODUCER',
        useFactory: async () => ({
          transport: Transport.RMQ,
          options: {
            urls: [process.env.RABBIT_MQ_URL],
            queue: 'socket_client_events',
            queueOptions: {
              durable: true,
            },
          },
        }),
      },
    ]),
  ],
})
export class SocketModule implements OnModuleInit {
  constructor(
    @Inject('SOCKET_CLIENT_PRODUCER') private readonly client: ClientProxy,
  ) {}

  async onModuleInit() {
    await this.client.connect();
  }
}
