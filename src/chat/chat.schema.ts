import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { HydratedDocument, Types, Document } from 'mongoose';
import { Users } from '../users/users.schema';

@Schema({ timestamps: true })
export class Chats extends Document {
  @Prop({ required: true, type: Types.ObjectId, ref: 'Users' })
  senderId: Users | Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Users' })
  receiverId: Users | Types.ObjectId;

  @Prop({ required: true, type: String })
  message: string;

  @Prop({ type: Date, default: Date.now() })
  timestamp: Date;
}

export type ChatDocument = HydratedDocument<Chats>;
export const ChatSchemas = SchemaFactory.createForClass(Chats);
