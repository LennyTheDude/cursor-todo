import { Todo, TodoModel } from '../models/todo.model';

export type PaginationParams = {
  userId: string;
  page: number;
  limit: number;
};

export type PaginatedTodos = {
  items: Todo[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type CreateTodoInput = {
  userId: string;
  title: string;
  description?: string;
};

export type UpdateTodoInput = {
  title?: string;
  description?: string;
  completed?: boolean;
};

export const listTodos = async ({
  userId,
  page,
  limit,
}: PaginationParams): Promise<PaginatedTodos> => {
  const skip = (page - 1) * limit;
  const filter = { userId };

  const [items, total] = await Promise.all([
    TodoModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean<Todo[]>(),
    TodoModel.countDocuments(filter),
  ]);

  return {
    items,
    total,
    page,
    limit,
    totalPages: Math.max(1, Math.ceil(total / limit)),
  };
};

export const getTodoById = async (id: string, userId: string): Promise<Todo | null> => {
  return TodoModel.findOne({ _id: id, userId }).lean<Todo | null>();
};

export const createTodo = async (data: CreateTodoInput): Promise<Todo> => {
  const todo = await TodoModel.create({
    userId: data.userId,
    title: data.title,
    description: data.description ?? '',
  });

  return todo.toObject();
};

export const updateTodo = async (
  id: string,
  userId: string,
  data: UpdateTodoInput,
): Promise<Todo | null> => {
  const update: Partial<Pick<Todo, 'title' | 'description' | 'completed'>> = {};

  if (typeof data.title === 'string') {
    update.title = data.title;
  }

  if (typeof data.description === 'string') {
    update.description = data.description;
  }

  if (typeof data.completed === 'boolean') {
    update.completed = data.completed;
  }

  return TodoModel.findOneAndUpdate({ _id: id, userId }, update, { new: true }).lean<Todo | null>();
};

export const deleteTodo = async (id: string, userId: string): Promise<Todo | null> => {
  return TodoModel.findOneAndDelete({ _id: id, userId }).lean<Todo | null>();
};
