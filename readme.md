# Scalable Socket.IO Server with NestJS

A demonstration project showcasing a scalable Socket.IO implementation using NestJS. 
This project implements a horizontally scalable WebSocket server architecture that can handle real-time communications across multiple server instances.


![screenshot](/screenshots/HLD.png)

## Architecture

The project consists of the following components:

- **Socket.IO Server**: NestJS-based WebSocket server with adapter for horizontal scaling
- **Consumer Service**: NestJS microservice that processes messages and broadcasts them to Socket.IO clients
- **Adapters**: Used for Socket.IO pub/sub between multiple server instances. eg. Redis
- **Message Brokers**: for handling event distribution. eg. RabbitMQ

## Features

- Horizontally scalable Socket.IO server using adapters
- Message queuing for reliable event processing
- Microservice architecture using NestJS
- Docker containerization for easy deployment

## Prerequisites

- Docker and Docker Compose
- Node.js (for local development)
- PNPM package manager

## Getting Started

1. Clone the repository:
```bash
git clone git@github.com:civilcoder55/scalable-nest-websockets.git
cd scalable-nest-websockets
```

2. Start the services using Docker Compose:
```bash
docker-compose up -d --scale socket-io-server=3
```

This will start:
- RabbitMQ (Management UI available at http://localhost:15672)
- Redis
- Socket.IO Server (3 instances available at http://localhost:3000, http://localhost:3001, http://localhost:3002)
- Consumer Service

## Testing the Setup

1. Connect to the Socket.IO server using a socket.io client (e.g., Postman)
2. Send a message to RabbitMQ's 'notification' queue
3. The consumer will process the message and broadcast it via Socket.IO
4. All connected clients will receive the notification

## Environment Variables

### Socket.IO Server
- `REDIS_URL`: Redis connection URL

### Consumer Service
- `RABBITMQ_URL`: RabbitMQ connection URL
- `REDIS_URL`: Redis connection URL

## Development

For local development:

1. Install dependencies:
```bash
pnpm install
```

2. Start services in development mode:
```bash
# Terminal 1 - Start dependencies
docker-compose up redis rmq

# Terminal 2 - Start Socket.IO server
cd socket-io-server
pnpm run start:dev

# Terminal 3 - Start consumer
cd consumer
pnpm run start:dev
```

## Contributing

Feel free to submit issues, fork the repository, and create pull requests for any improvements.

## License

[MIT License](LICENSE)