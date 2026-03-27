import { NextFunction, Request, Response } from 'express';
import { ZodTypeAny, ZodError } from 'zod';
import { HttpError } from '../utils/http-error';

type RequestSource = 'body' | 'query' | 'params';

export const validate =
  (schema: ZodTypeAny, source: RequestSource = 'body') =>
  (req: Request, _res: Response, next: NextFunction): void => {
    try {
      const parsed = schema.parse(req[source]);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (req as any)[source] = parsed;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        next(
          new HttpError(
            400,
            'Validation error',
            error.errors.map((issue) => ({
              path: issue.path.join('.'),
              message: issue.message,
            })),
          ),
        );
        return;
      }

      next(new HttpError(400, 'Invalid request payload'));
    }
  };


