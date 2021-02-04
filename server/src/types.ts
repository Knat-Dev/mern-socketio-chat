import { Request as ExpressRequest } from 'express';

export interface Request<T = any> extends ExpressRequest {
  body: T;
  payload?: { id: string };
}
export type LoginInput = {
  email: string;
  password: string;
};

export type RegisterInput = {
  name: string;
  email: string;
  password: string;
};

export type ChatRoomInput = {
  name: string;
};
