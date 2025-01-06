import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ChatModule } from './chat/chat.module';
import { MongoModule } from './utils/mongo';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), MongoModule.forRoot(), ChatModule],
})
export class AppModule {}
