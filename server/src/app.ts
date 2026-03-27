import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import authRouter from './routes/auth.routes';
import todoRouter from './routes/todo.routes';
import { HttpError } from './utils/http-error';
import { logger } from './config/logger';
import { requestLogger } from './middleware/request-logger';

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:5173',
  }),
);

app.use(requestLogger);

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use('/auth', authRouter);
app.use('/todos', todoRouter);

app.use((error: unknown, _req: Request, res: Response, _next: NextFunction) => {
  if (error instanceof HttpError) {
    res
      .status(error.statusCode)
      .json({ message: error.message, statusCode: error.statusCode, details: error.details });
    return;
  }

  if (error instanceof Error) {
    logger.error({ message: error.message, stack: error.stack }, 'Unhandled error');
  } else {
    logger.error({ error }, 'Unhandled error');
  }

  res.status(500).json({ message: 'Internal server error', statusCode: 500 });
});

export default app;
