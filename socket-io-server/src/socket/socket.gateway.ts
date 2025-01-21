import { Inject, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketGateway {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger('SocketGateway');

  constructor(@Inject('SOCKET_CLIENT_PRODUCER') private client: ClientProxy) {}

  @SubscribeMessage('CMD')
  emit(@MessageBody() message: any): string {
    this.client.send('CMD', message).subscribe();
    this.logger.log(
      'Received: message from client and emitted to message broker',
    );
    return 'success';
  }
}
