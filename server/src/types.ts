import { Request as ExpressRequest } from 'express';
import { Socket as IOSocket } from 'socket.io';

export interface Request<T = any> extends ExpressRequest {
  body: T;
  payload?: { id: string };
}
export interface Socket extends IOSocket {
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
