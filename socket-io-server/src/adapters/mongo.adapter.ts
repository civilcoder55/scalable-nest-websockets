import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';
import { createAdapter } from '@socket.io/mongo-adapter';
import { MongoClient } from 'mongodb';

export class MongoAdapter extends IoAdapter {
  private adapterConstructor: ReturnType<typeof createAdapter>;

  async connect(): Promise<void> {
    const DB = 'mydb';
    const COLLECTION = 'socket.io-adapter-events';

    const mongoClient = new MongoClient(
      'mongodb://localhost:27017',
    );

    await mongoClient.connect();

    try {
      await mongoClient.db(DB).createCollection(COLLECTION, {
        capped: true,
        size: 1e6,
      });
    } catch (e) {
      // collection already exists
    }

    const mongoCollection = mongoClient.db(DB).collection(COLLECTION);

    this.adapterConstructor = createAdapter(mongoCollection);
  }

  createIOServer(port: number, options?: ServerOptions): any {
    const server = super.createIOServer(port, options);
    server.adapter(this.adapterConstructor);
    return server;
  }
}
