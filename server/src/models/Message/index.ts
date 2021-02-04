import { getModelForClass, mongoose, prop, Ref } from '@typegoose/typegoose';
import { ChatRoom } from '../ChatRoom';
import { User } from '../User';

export class Message {
  @prop({ required: 'Chat room id is required', type: mongoose.Types.ObjectId })
  chatRoomId: Ref<ChatRoom>;

  @prop({ required: 'User id is required', type: mongoose.Types.ObjectId })
  userId: Ref<User>;

  @prop({ required: 'Name is required!' })
  message: string;
}

export const MessageModel = getModelForClass(Message, {
  schemaOptions: { timestamps: true },
});
