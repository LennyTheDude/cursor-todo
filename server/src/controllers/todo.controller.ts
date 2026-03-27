import { Request, Response } from 'express';
import {
  createTodo,
  deleteTodo,
  getTodoById,
  listTodos,
  updateTodo,
} from '../services/todo.service';
import { HttpError } from '../utils/http-error';

const parsePositiveInteger = (value: unknown, fallback: number): number => {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    return fallback;
  }
  return parsed;
};

const getIdParam = (value: string | string[]): string => {
  return Array.isArray(value) ? value[0] : value;
};

const getUserId = (req: Request): string => {
  if (!req.user?.userId) {
    throw new HttpError(401, 'Unauthorized');
  }

  return req.user.userId;
};

export const getTodosController = async (req: Request, res: Response): Promise<void> => {
  const userId = getUserId(req);
  const page = parsePositiveInteger(req.query.page, 1);
  const limit = parsePositiveInteger(req.query.limit, 10);
  const result = await listTodos({ userId, page, limit });
  res.status(200).json(result);
};

export const getTodoByIdController = async (req: Request, res: Response): Promise<void> => {
  const userId = getUserId(req);
  const todo = await getTodoById(getIdParam(req.params.id), userId);

  if (!todo) {
    throw new HttpError(403, 'Forbidden');
  }

  res.status(200).json(todo);
};

export const createTodoController = async (req: Request, res: Response): Promise<void> => {
  const userId = getUserId(req);
  const { title, description } = req.body as { title?: unknown; description?: unknown };

  if (typeof title !== 'string' || title.trim().length === 0) {
    throw new HttpError(400, 'Title is required');
  }

  const todo = await createTodo({
    userId,
    title: title.trim(),
    description: typeof description === 'string' ? description.trim() : '',
  });

  res.status(201).json(todo);
};

export const updateTodoController = async (req: Request, res: Response): Promise<void> => {
  const userId = getUserId(req);
  const { title, description, completed } = req.body as {
    title?: unknown;
    description?: unknown;
    completed?: unknown;
  };

  if (title !== undefined && (typeof title !== 'string' || title.trim().length === 0)) {
    throw new HttpError(400, 'Title must be a non-empty string');
  }

  if (description !== undefined && typeof description !== 'string') {
    throw new HttpError(400, 'Description must be a string');
  }

  if (completed !== undefined && typeof completed !== 'boolean') {
    throw new HttpError(400, 'Completed must be a boolean');
  }

  const todo = await updateTodo(getIdParam(req.params.id), userId, {
    title: typeof title === 'string' ? title.trim() : undefined,
    description: typeof description === 'string' ? description.trim() : undefined,
    completed: typeof completed === 'boolean' ? completed : undefined,
  });

  if (!todo) {
    throw new HttpError(404, 'Todo not found');
  }

  res.status(200).json(todo);
};

export const deleteTodoController = async (req: Request, res: Response): Promise<void> => {
  const userId = getUserId(req);
  const deletedTodo = await deleteTodo(getIdParam(req.params.id), userId);

  if (!deletedTodo) {
    throw new HttpError(403, 'Forbidden');
  }

  res.status(204).send();
};
