// Env
import dotenv from 'dotenv';
import express from 'express';
import { createServer } from 'http';
import { verify } from 'jsonwebtoken';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import { logger } from './middleware';
import { chatRoomsRoute } from './routes/chatRooms.route';
import { userRouter } from './routes/users.route';
import { Socket } from './types';
dotenv.config();

const port = process.env.PORT ? parseInt(process.env.PORT) : 5000;
const app = express();

// Express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

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

const io = new Server(http);

io.use((socket: Socket, next: any) => {
  const token = socket.handshake.query.token as string;

  try {
    const payload = verify(token, process.env.JWT_SECRET) as { id: string };
    socket.payload = payload;
    return next();
  } catch (e) {}
});

io.on('connect', (socket: Socket) => {
  if (socket.payload?.id) {
    console.log('Connected: ' + socket.payload?.id);

    socket.on('disconnect', () => {
      console.log('Disconnected: ' + socket.payload?.id);
    });
  }
});
