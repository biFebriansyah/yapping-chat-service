import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Chats } from './chat.schema';
import { CreateChatDto, GetChatDto, UpdateChatDto } from './chat.dto';

@Injectable()
export class ChatService {
  constructor(@InjectModel(Chats.name) private chatModel: Model<Chats>) {}

  async getAll(): Promise<GetChatDto[]> {
    try {
      return await this.chatModel.find().exec();
    } catch (error) {
      throw error;
    }
  }

  async getById(chatId: string): Promise<GetChatDto> {
    try {
      const objectId = new Types.ObjectId(chatId);
      return await this.chatModel.findOne({ _id: objectId }).exec();
    } catch (error) {
      throw error;
    }
  }

  async getUserChat(userId: string): Promise<GetChatDto[]> {
    try {
      const objectId = new Types.ObjectId(userId);
      return await this.chatModel.find({ $or: [{ senderId: objectId }, { receiverId: objectId }] }).exec();
    } catch (error) {
      throw error;
    }
  }

  async getUserHistory(userId: string, receiverId: string): Promise<GetChatDto[]> {
    try {
      const userObjId = new Types.ObjectId(userId);
      const receiverObjId = new Types.ObjectId(receiverId);
      return await this.chatModel
        .find({
          $or: [
            { senderId: userObjId, receiverId: receiverObjId },
            { senderId: receiverObjId, receiverId: userObjId },
          ],
        })
        .exec();
    } catch (error) {
      throw error;
    }
  }

  async createChat(body: CreateChatDto): Promise<any> {
    try {
      const senderId = new Types.ObjectId(body.senderId);
      const receiverId = new Types.ObjectId(body.receiverId);
      const chatData = await new this.chatModel({ ...body, senderId, receiverId }).save();
      return { chatId: chatData._id };
    } catch (error) {
      throw error;
    }
  }

  async updateChat(body: UpdateChatDto): Promise<any> {
    try {
      const chatId = new Types.ObjectId(body.chatId);
      await this.chatModel.updateOne({ _id: chatId }, { ...body }).exec();
      return { chatId: chatId };
    } catch (error) {
      throw error;
    }
  }

  async deleteChatMessage(chatId: string): Promise<any> {
    try {
      const chatObjId = new Types.ObjectId(chatId);
      await this.chatModel.deleteOne({ _id: chatObjId }).exec();
      return { chatId: chatId };
    } catch (error) {
      throw error;
    }
  }
}
