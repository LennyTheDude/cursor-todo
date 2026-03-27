const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000';

type AuthResponse = {
  token: string;
};

type AuthInput = {
  email: string;
  password: string;
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

  return (await response.json()) as T;
};

const postAuth = async (path: 'register' | 'login', data: AuthInput): Promise<AuthResponse> => {
  const response = await fetch(`${API_BASE_URL}/auth/${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  return parseResponse<AuthResponse>(response);
};

export const register = async (data: AuthInput): Promise<AuthResponse> => {
  return postAuth('register', data);
};

export const login = async (data: AuthInput): Promise<AuthResponse> => {
  return postAuth('login', data);
};
