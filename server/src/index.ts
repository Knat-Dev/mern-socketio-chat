// Env
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { createServer } from 'http';
import { verify } from 'jsonwebtoken';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import { logger } from './middleware';
import { MessageModel, UserModel } from './models';
import { chatRoomsRoute } from './routes/chatRooms.route';
import { userRouter } from './routes/users.route';
import { Socket } from './types';
dotenv.config();

const port = process.env.PORT ? parseInt(process.env.PORT) : 5000;
const app = express();

// Express middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(logger);
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  })
);

// Routers
app.use('/users', userRouter);
app.use('/chats', chatRoomsRoute);

const http = createServer(app);

http.listen(port, async () => {
  console.log(`Server is listening on ${process.env.HOST_URL}:${port}`);
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('Connected to MongoDB!');
});

const io = new Server(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.use((socket: Socket, next: any) => {
  const token = socket.handshake.query.token as string;

  try {
    const payload = verify(token, process.env.JWT_SECRET) as { id: string };
    socket.payload = payload;
    return next();
  } catch (e) {
    console.log('unauth');
  }
});

io.on('connection', (socket: Socket) => {
  if (socket.payload?.id) {
    console.log('Connected: ' + socket.payload?.id);

    socket.on('joinRoom', ({ id }) => {
      socket.join(id);
      console.log('A user joined chatroom: ' + id);
    });

    socket.on('leaveRoom', ({ id }) => {
      socket.leave(id);
      console.log('A user left chatroom: ' + id);
    });

    socket.on(
      'newChatRoomMessage',
      async ({
        chatRoomId,
        message,
      }: {
        message: string;
        chatRoomId: string;
      }) => {
        if (message.trim()) {
          const user = await UserModel.findById(socket.payload?.id);
          const newMessage = await MessageModel.create({
            chatRoomId,
            message,
            userId: user?._id,
          });
          if (user)
            io.to(chatRoomId).emit('newMessage', {
              _id: newMessage._id,
              chatRoomId: newMessage.chatRoomId,
              message: newMessage.message,
              user,
            });
          console.log('emitted: ' + message);
        }
      }
    );

    socket.on('disconnect', () => {
      console.log('Disconnected: ' + socket.payload?.id);
    });
  }
});
