import { getModelForClass, prop } from '@typegoose/typegoose';

export class User {
  @prop({ required: 'Name is required!' })
  name: string;

  @prop({ required: 'Email is required!' })
  email: string;

  @prop({ required: 'Password is required!' })
  password: string;
}

export const UserModel = getModelForClass(User, {
  schemaOptions: { timestamps: true },
});
