import { Controller } from '@nestjs/common';
import { ChatService } from './chat.service';
import { status } from '@grpc/grpc-js';
import { CreateChatDto, GetChatDto, UpdateChatDto, GetParams } from './chat.dto';
import { GrpcMethod, RpcException } from '@nestjs/microservices';

@Controller('chat')
export class ChatController {
  constructor(private service: ChatService) {}

  @GrpcMethod('ChatService', 'FatchAll')
  async FatchAll(): Promise<{ chats: GetChatDto[] }> {
    try {
      const result = await this.service.getAll();
      return { chats: result };
    } catch (error) {
      throw new RpcException({
        code: status.INTERNAL,
        message: error.message || 'An unexpected error occurred',
      });
    }
  }

  @GrpcMethod('ChatService', 'FatchById')
  async FatchById(params: GetParams): Promise<GetChatDto> {
    try {
      const result = await this.service.getById(params.chatId);
      if (!result) {
        throw new RpcException({
          code: status.NOT_FOUND,
          message: 'Data Not Found',
        });
      }

      return result;
    } catch (error) {
      throw new RpcException({
        code: status.INTERNAL,
        message: error.message || 'An unexpected error occurred',
      });
    }
  }

  @GrpcMethod('ChatService', 'FatchUserChat')
  async FatchUserChat(params: GetParams): Promise<GetChatDto[]> {
    try {
      const result = await this.service.getUserChat(params.userId);
      if (!result) {
        throw new RpcException({
          code: status.NOT_FOUND,
          message: 'Data Not Found',
        });
      }

      return result;
    } catch (error) {
      throw new RpcException({
        code: status.INTERNAL,
        message: error.message || 'An unexpected error occurred',
      });
    }
  }

  @GrpcMethod('ChatService', 'FatchChatHistory')
  async FatchChatHistory(params: GetParams): Promise<GetChatDto[]> {
    try {
      const result = await this.service.getUserHistory(params.userId, params.receiverId);
      if (!result) {
        throw new RpcException({
          code: status.NOT_FOUND,
          message: 'Data Not Found',
        });
      }

      return result;
    } catch (error) {
      throw new RpcException({
        code: status.INTERNAL,
        message: error.message || 'An unexpected error occurred',
      });
    }
  }

  @GrpcMethod('ChatService', 'CreateChat')
  async CreateChat(body: CreateChatDto): Promise<any> {
    try {
      const result = await this.service.createChat(body);
      return result;
    } catch (error) {
      throw new RpcException({
        code: status.INTERNAL,
        message: error.message || 'An unexpected error occurred',
      });
    }
  }

  @GrpcMethod('ChatService', 'UpdateChat')
  async UpdateChat(body: UpdateChatDto): Promise<any> {
    try {
      const result = await this.service.updateChat(body);
      return result;
    } catch (error) {
      throw new RpcException({
        code: status.INTERNAL,
        message: error.message || 'An unexpected error occurred',
      });
    }
  }

  @GrpcMethod('ChatService', 'DeleteMessage')
  async DeleteMessage(params: GetParams): Promise<any> {
    try {
      const result = await this.service.deleteChatMessage(params.chatId);
      return result;
    } catch (error) {
      throw new RpcException({
        code: status.INTERNAL,
        message: error.message || 'An unexpected error occurred',
      });
    }
  }
}
