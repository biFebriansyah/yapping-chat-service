import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Chats, ChatSchemas } from './chat.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Chats.name, schema: ChatSchemas }])],
  providers: [ChatService],
  controllers: [ChatController],
})
export class ChatModule {}
