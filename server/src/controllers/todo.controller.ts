import { Request, Response } from 'express';
import {
  createTodo,
  deleteTodo,
  getTodoById,
  listTodos,
  updateTodo,
} from '../services/todo.service';
import { HttpError } from '../utils/http-error';
import type { CreateTodoInput, ListTodosQuery, UpdateTodoInput } from '../validators/todo.validator';

const getIdParam = (value: string | string[]): string => {
  return Array.isArray(value) ? value[0] : value;
};

const getUserId = (req: Request): string => {
  if (!req.user?.userId) {
    throw new HttpError(401, 'Unauthorized');
  }

  return req.user.userId;
};

type CreateTodoRequest = Request<unknown, unknown, CreateTodoInput>;
type UpdateTodoRequest = Request<{ id: string }, unknown, UpdateTodoInput>;

export const getTodosController = async (req: Request, res: Response): Promise<void> => {
  const userId = getUserId(req);
  const { page, limit } = req.query as unknown as ListTodosQuery;
  const result = await listTodos({ userId, page, limit });
  res.status(200).json(result);
};

export const getTodoByIdController = async (req: Request, res: Response): Promise<void> => {
  const userId = getUserId(req);
  const todo = await getTodoById(getIdParam(req.params.id), userId);

  if (!todo) {
    throw new HttpError(404, 'Todo not found');
  }

  res.status(200).json(todo);
};

export const createTodoController = async (req: CreateTodoRequest, res: Response): Promise<void> => {
  const userId = getUserId(req);
  const todo = await createTodo({
    userId,
    title: req.body.title,
    description: req.body.description ?? '',
  });

  res.status(201).json(todo);
};

export const updateTodoController = async (req: UpdateTodoRequest, res: Response): Promise<void> => {
  const userId = getUserId(req);
  const todo = await updateTodo(getIdParam(req.params.id), userId, {
    title: req.body.title ?? undefined,
    description: req.body.description ?? undefined,
    completed: req.body.completed,
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
    throw new HttpError(404, 'Todo not found');
  }

  res.status(204).send();
};
