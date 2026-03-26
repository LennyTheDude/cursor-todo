import { Todo, TodoModel } from '../models/todo.model';

export type PaginationParams = {
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
  title: string;
  description?: string;
};

export type UpdateTodoInput = {
  title?: string;
  description?: string;
  completed?: boolean;
};

export const listTodos = async ({
  page,
  limit,
}: PaginationParams): Promise<PaginatedTodos> => {
  const skip = (page - 1) * limit;

  const [items, total] = await Promise.all([
    TodoModel.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean<Todo[]>(),
    TodoModel.countDocuments(),
  ]);

  return {
    items,
    total,
    page,
    limit,
    totalPages: Math.max(1, Math.ceil(total / limit)),
  };
};

export const getTodoById = async (id: string): Promise<Todo | null> => {
  return TodoModel.findById(id).lean<Todo | null>();
};

export const createTodo = async (data: CreateTodoInput): Promise<Todo> => {
  const todo = await TodoModel.create({
    title: data.title,
    description: data.description ?? '',
  });

  return todo.toObject();
};

export const updateTodo = async (
  id: string,
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

  return TodoModel.findByIdAndUpdate(id, update, { new: true }).lean<Todo | null>();
};

export const deleteTodo = async (id: string): Promise<Todo | null> => {
  return TodoModel.findByIdAndDelete(id).lean<Todo | null>();
};
