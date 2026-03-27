import { Request, Response } from 'express';
import { loginUser, registerUser } from '../services/auth.service';
import { HttpError } from '../utils/http-error';

type AuthBody = {
  email?: unknown;
  password?: unknown;
};

const parseAuthBody = (body: AuthBody): { email: string; password: string } => {
  const { email, password } = body;

  if (typeof email !== 'string' || email.trim().length === 0) {
    throw new HttpError(400, 'Email is required');
  }

  if (typeof password !== 'string' || password.trim().length === 0) {
    throw new HttpError(400, 'Password is required');
  }

  return {
    email: email.trim(),
    password: password.trim(),
  };
};

export const registerController = async (req: Request, res: Response): Promise<void> => {
  const payload = parseAuthBody(req.body as AuthBody);
  const result = await registerUser(payload);
  res.status(201).json(result);
};

export const loginController = async (req: Request, res: Response): Promise<void> => {
  const payload = parseAuthBody(req.body as AuthBody);
  const result = await loginUser(payload);
  res.status(200).json(result);
};
