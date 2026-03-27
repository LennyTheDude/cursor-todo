import { Request, Response } from 'express';
import { loginUser, registerUser } from '../services/auth.service';
import type { AuthInput } from '../validators/auth.validator';

type AuthRequest = Request<unknown, unknown, AuthInput>;

export const registerController = async (req: AuthRequest, res: Response): Promise<void> => {
  const result = await registerUser(req.body);
  res.status(201).json(result);
};

export const loginController = async (req: AuthRequest, res: Response): Promise<void> => {
  const result = await loginUser(req.body);
  res.status(200).json(result);
};
