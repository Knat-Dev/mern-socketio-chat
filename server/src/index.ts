// Env
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import { createServer } from 'http';

const port = process.env.PORT ? parseInt(process.env.PORT) : 5000;
const app = express();

// Express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const http = createServer(app);

http.listen(port, async () => {
  console.log(`Server is listening on ${process.env.HOST_URL}:${port}`);
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('Connected to MongoDB!');
});
