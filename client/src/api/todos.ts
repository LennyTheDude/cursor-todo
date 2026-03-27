const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000';
import { getToken } from '../auth/token';

export type Todo = {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
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

const parseResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    let message = 'Request failed';

    try {
      const body = (await response.json()) as { message?: string };
      if (body.message) {
        message = body.message;
      }
    } catch {
      // Ignore invalid json error payloads.
    }

    throw new Error(message);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
};

const buildAuthHeaders = (includeJson = false): HeadersInit => {
  const token = getToken();
  const headers: Record<string, string> = {};

  if (includeJson) {
    headers['Content-Type'] = 'application/json';
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

export const getTodos = async (page = 1, limit = 10): Promise<PaginatedTodos> => {
  const response = await fetch(`${API_BASE_URL}/todos?page=${page}&limit=${limit}`, {
    headers: buildAuthHeaders(),
  });
  return parseResponse<PaginatedTodos>(response);
};

export const createTodo = async (data: CreateTodoInput): Promise<Todo> => {
  const response = await fetch(`${API_BASE_URL}/todos`, {
    method: 'POST',
    headers: buildAuthHeaders(true),
    body: JSON.stringify(data),
  });

  return parseResponse<Todo>(response);
};

export const updateTodo = async (id: string, data: UpdateTodoInput): Promise<Todo> => {
  const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
    method: 'PUT',
    headers: buildAuthHeaders(true),
    body: JSON.stringify(data),
  });

  return parseResponse<Todo>(response);
};

export const deleteTodo = async (id: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
    method: 'DELETE',
    headers: buildAuthHeaders(),
  });

  await parseResponse<void>(response);
};
