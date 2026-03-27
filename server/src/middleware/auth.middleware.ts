import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { HttpError } from '../utils/http-error';

type JwtPayload = {
  userId?: unknown;
};

export const authMiddleware = (req: Request, _res: Response, next: NextFunction): void => {
  const authorizationHeader = req.header('authorization');

  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    throw new HttpError(401, 'Unauthorized');
  }

  const token = authorizationHeader.slice('Bearer '.length).trim();
  if (token.length === 0) {
    throw new HttpError(401, 'Unauthorized');
  }

  try {
    const decoded = jwt.verify(token, env.jwtSecret) as JwtPayload;
    if (typeof decoded.userId !== 'string' || decoded.userId.length === 0) {
      throw new HttpError(401, 'Unauthorized');
    }

    req.user = { userId: decoded.userId };
    next();
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }

    throw new HttpError(401, 'Unauthorized');
  }
};
