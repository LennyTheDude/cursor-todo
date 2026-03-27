import request from 'supertest';
import { testApp } from './setup';

const REGISTER_ENDPOINT = '/auth/register';
const LOGIN_ENDPOINT = '/auth/login';

describe('Auth routes', () => {
  const email = 'user@example.com';
  const password = 'password123';

  it('registers a new user and returns a token', async () => {
    const response = await request(testApp).post(REGISTER_ENDPOINT).send({ email, password });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('token');
    expect(typeof response.body.token).toBe('string');
  });

  it('logs in an existing user and returns a token', async () => {
    await request(testApp).post(REGISTER_ENDPOINT).send({ email, password });

    const response = await request(testApp).post(LOGIN_ENDPOINT).send({ email, password });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('rejects invalid credentials', async () => {
    await request(testApp).post(REGISTER_ENDPOINT).send({ email, password });

    const responseWrongPassword = await request(testApp)
      .post(LOGIN_ENDPOINT)
      .send({ email, password: 'wrong-password' });

    expect(responseWrongPassword.status).toBe(401);
    expect(responseWrongPassword.body).toMatchObject({ message: 'Invalid email or password', statusCode: 401 });

    const responseUnknownUser = await request(testApp)
      .post(LOGIN_ENDPOINT)
      .send({ email: 'unknown@example.com', password });

    expect(responseUnknownUser.status).toBe(401);
    expect(responseUnknownUser.body).toMatchObject({ message: 'Invalid email or password', statusCode: 401 });
  });

  it('rejects invalid email format', async () => {
    const response = await request(testApp).post(REGISTER_ENDPOINT).send({ email: 'not-an-email', password });

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      message: 'Validation error',
      statusCode: 400,
    });
    expect(Array.isArray(response.body.details)).toBe(true);
  });

  it('rejects too-short password', async () => {
    const response = await request(testApp).post(REGISTER_ENDPOINT).send({ email, password: '123' });

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      message: 'Validation error',
      statusCode: 400,
    });
  });
});

