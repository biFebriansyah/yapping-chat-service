import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ChatModule } from './chat/chat.module';
import { MongoModule } from './utils/mongo';
import { RabbitModule } from './utils/rabbit';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongoModule.forRoot(),
    RabbitModule.forRoot(),
    ChatModule,
  ],
})
export class AppModule {}
