import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { HydratedDocument, Types, Document } from 'mongoose';

@Schema({ timestamps: true })
export class Chats extends Document {
  @Prop({ required: true, type: Types.ObjectId, ref: 'Users' })
  senderId: Types.ObjectId | any;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Users' })
  receiverId: Types.ObjectId | any;

  @Prop({ required: true, type: String })
  message: string;

  @Prop({ type: Date, default: Date.now() })
  timestamp: Date;
}

export type ChatDocument = HydratedDocument<Chats>;
export const ChatSchemas = SchemaFactory.createForClass(Chats);
