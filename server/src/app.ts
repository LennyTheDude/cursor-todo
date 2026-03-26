import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import todoRouter from './routes/todo.routes';
import { HttpError } from './utils/http-error';

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:5173',
  }),
);

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use('/todos', todoRouter);

app.use((error: unknown, _req: Request, res: Response, _next: NextFunction) => {
  if (error instanceof HttpError) {
    res.status(error.statusCode).json({ message: error.message });
    return;
  }

  console.error(error);
  res.status(500).json({ message: 'Internal server error' });
});

export default app;
