import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { HydratedDocument, Document } from 'mongoose';

@Schema({ timestamps: true, autoIndex: false })
export class Users extends Document {
  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  gender: string;

  @Prop({ type: Date })
  birthday: Date;

  @Prop({ type: String })
  picture: string;

  @Prop({ type: String })
  horoscope: string;

  @Prop({ type: String })
  zodiac: string;

  @Prop({ type: Number })
  height: number;

  @Prop({ type: Number })
  weight: number;

  @Prop({ required: true, type: String })
  email: string;

  @Prop({ required: true, type: String, unique: true })
  username: string;

  @Prop({ required: true, type: String })
  password: string;
}

export type UserDocument = HydratedDocument<Users>;
export const UserSchema = SchemaFactory.createForClass(Users).set('toJSON', {
  transform: (doc, ret) => {
    delete ret.__v;
  },
});
