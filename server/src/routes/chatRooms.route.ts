import { Router } from 'express';
import { createChatRoom } from '../controllers/ChatRoom';
import { isAuthorized } from '../middleware';

export const chatRoomsRoute = Router();

chatRoomsRoute.post('/', isAuthorized, createChatRoom);
