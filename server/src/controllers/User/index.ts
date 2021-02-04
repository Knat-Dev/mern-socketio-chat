import { compare, hash } from 'bcryptjs';
import { Response } from 'express';
import { sign } from 'jsonwebtoken';
import { UserModel } from '../../models';
import { LoginInput, RegisterInput, Request } from '../../types';

export const login = async (req: Request<LoginInput>, res: Response) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });
  const errors = [];
  if (!user)
    errors.push({
      field: 'email',
      message: 'Could not find a user matching this email',
    });

  if (!user || errors.length > 0) return res.status(400).json({ errors });

  try {
    const valid = compare(password, user?.password);
    if (!valid) errors.push({ field: 'password', message: 'Bad password' });
    if (errors.length > 0) return res.status(400).json({ errors });

    const token = sign({ id: user._id }, process.env.JWT_SECRET);
    return res.json({ message: 'You have signed in successfully', token });
  } catch (e) {
    console.log(e);
  }
};

export const register = async (req: Request<RegisterInput>, res: Response) => {
  const { name, email, password } = req.body;

  const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  const errors = [];

  try {
    const userAlreadyExists = await UserModel.findOne({
      $or: [{ email }, { name }],
    });
    if (userAlreadyExists) {
      if (userAlreadyExists.email === email)
        errors.push({
          field: 'email',
          message: 'Email already exist',
        });
      if (userAlreadyExists.name === name)
        errors.push({
          field: 'name',
          message: 'Name already exist',
        });
    }
  } catch (e) {
    console.log(e);
  }

  if (!name) errors.push({ field: 'name', message: 'Name is required!' });

  if (!emailRegex.test(email))
    errors.push({ field: 'email', message: 'Email is not valid!' });

  if (password.length < 6)
    errors.push({ field: 'password', message: 'Password is too short' });

  if (errors.length > 0) return res.json({ errors });

  try {
    const hashedPassword = await hash(password, 10);
    await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });
    return res.json({
      message: 'User was created successfully!\nYou may sign in.',
    });
  } catch (e) {
    console.log(e);
  }
};
