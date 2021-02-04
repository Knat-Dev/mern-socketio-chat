import { Router } from 'express';
import { createChatRoom, getAllRooms } from '../controllers/ChatRoom';
import { isAuthorized } from '../middleware';

export const chatRoomsRoute = Router();

chatRoomsRoute.post('/', isAuthorized, createChatRoom);
chatRoomsRoute.get('/', isAuthorized, getAllRooms);
