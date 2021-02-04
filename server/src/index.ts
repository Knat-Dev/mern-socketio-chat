// Env
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { createServer } from 'http';

const port = process.env.PORT ? parseInt(process.env.PORT) : 5000;
const app = express();

const http = createServer(app);

http.listen(port, () => {
  console.log(`Server is listening on ${process.env.HOST_URL}:${port}`);
});
