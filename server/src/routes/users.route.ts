import { Router } from 'express';
import { login, register } from '../controllers';

export const userRouter = Router();

userRouter.post('/login', login);
userRouter.post('/register', register);
