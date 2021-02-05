import { Router } from 'express';
import { login, refresh, register } from '../controllers';

export const userRouter = Router();

userRouter.post('/login', login);
userRouter.post('/register', register);
userRouter.post('/refresh', refresh);
