import { createAdapter } from '@socket.io/postgres-adapter';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';
import * as pg from 'pg';

export class PostgresAdapter extends IoAdapter {
  private adapterConstructor: ReturnType<typeof createAdapter>;

  async connect(): Promise<void> {
    const pool = new pg.Pool({
      user: 'postgres',
      host: 'localhost',
      database: 'postgres',
      password: '',
      port: 5432,
    });

    pool.query(`
        CREATE TABLE IF NOT EXISTS socket_io_attachments (
            id          bigserial UNIQUE,
            created_at  timestamptz DEFAULT NOW(),
            payload     bytea
        );
      `);

    pool.on('error', (err) => {
      console.error('Postgres error', err);
    });

    this.adapterConstructor = createAdapter(pool);
  }

  createIOServer(port: number, options?: ServerOptions): any {
    const server = super.createIOServer(port, options);
    server.adapter(this.adapterConstructor);
    return server;
  }
}
