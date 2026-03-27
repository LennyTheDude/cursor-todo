import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { UserModel } from '../models/user.model';
import { HttpError } from '../utils/http-error';

type AuthInput = {
  email: string;
  password: string;
};

type AuthResponse = {
  token: string;
};

const SALT_ROUNDS = 10;
const JWT_EXPIRES_IN = env.jwtExpiresIn as jwt.SignOptions['expiresIn'];

const signToken = (userId: string): string => {
  return jwt.sign({ userId }, env.jwtSecret, { expiresIn: JWT_EXPIRES_IN });
};

export const registerUser = async ({ email, password }: AuthInput): Promise<AuthResponse> => {
  const normalizedEmail = email.trim().toLowerCase();
  const existingUser = await UserModel.findOne({ email: normalizedEmail }).lean();

  if (existingUser) {
    throw new HttpError(409, 'Email already in use');
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  const user = await UserModel.create({
    email: normalizedEmail,
    password: hashedPassword,
  });

  return { token: signToken(user.id) };
};

export const loginUser = async ({ email, password }: AuthInput): Promise<AuthResponse> => {
  const normalizedEmail = email.trim().toLowerCase();
  const user = await UserModel.findOne({ email: normalizedEmail });

  if (!user) {
    throw new HttpError(401, 'Invalid email or password');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new HttpError(401, 'Invalid email or password');
  }

  return { token: signToken(user.id) };
};
