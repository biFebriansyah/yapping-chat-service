import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './module';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: 'chats',
      protoPath: join(__dirname, '/_proto/chat.proto'),
      url: process.env.GRPC_URL || 'localhost:3004',
    },
  });

  await app.listen();
}
bootstrap();
