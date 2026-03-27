import request from 'supertest';
import { testApp } from './setup';

const REGISTER_ENDPOINT = '/auth/register';
const LOGIN_ENDPOINT = '/auth/login';
const TODOS_ENDPOINT = '/todos';

const createUserAndGetToken = async (email: string): Promise<string> => {
  const password = 'password123';
  await request(testApp).post(REGISTER_ENDPOINT).send({ email, password });
  const loginResponse = await request(testApp).post(LOGIN_ENDPOINT).send({ email, password });
  return loginResponse.body.token as string;
};

describe('Todo routes', () => {
  it('creates a todo for an authenticated user', async () => {
    const token = await createUserAndGetToken('todo-user1@example.com');

    const response = await request(testApp)
      .post(TODOS_ENDPOINT)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Test todo' });

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({ title: 'Test todo', completed: false });
  });

  it('fails to create a todo without token', async () => {
    const response = await request(testApp).post(TODOS_ENDPOINT).send({ title: 'Should fail' });

    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({ message: 'Unauthorized', statusCode: 401 });
  });

  it('returns only the authenticated user todos', async () => {
    const tokenUser1 = await createUserAndGetToken('todo-user2@example.com');
    const tokenUser2 = await createUserAndGetToken('todo-user3@example.com');

    await request(testApp)
      .post(TODOS_ENDPOINT)
      .set('Authorization', `Bearer ${tokenUser1}`)
      .send({ title: 'User1 todo' });

    await request(testApp)
      .post(TODOS_ENDPOINT)
      .set('Authorization', `Bearer ${tokenUser2}`)
      .send({ title: 'User2 todo' });

    const responseUser1 = await request(testApp)
      .get(TODOS_ENDPOINT)
      .set('Authorization', `Bearer ${tokenUser1}`);

    expect(responseUser1.status).toBe(200);
    expect(responseUser1.body.items).toHaveLength(1);
    expect(responseUser1.body.items[0]).toMatchObject({ title: 'User1 todo' });
  });

  it('allows a user to update and delete only their own todos', async () => {
    const tokenOwner = await createUserAndGetToken('todo-owner@example.com');
    const tokenOther = await createUserAndGetToken('todo-other@example.com');

    const createResponse = await request(testApp)
      .post(TODOS_ENDPOINT)
      .set('Authorization', `Bearer ${tokenOwner}`)
      .send({ title: 'Owner todo' });

    const todoId = createResponse.body._id as string;

    const updateResponse = await request(testApp)
      .put(`${TODOS_ENDPOINT}/${todoId}`)
      .set('Authorization', `Bearer ${tokenOwner}`)
      .send({ completed: true });

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body).toMatchObject({ completed: true });

    const updateForbidden = await request(testApp)
      .put(`${TODOS_ENDPOINT}/${todoId}`)
      .set('Authorization', `Bearer ${tokenOther}`)
      .send({ completed: false });

    expect(updateForbidden.status).toBe(404);

    const deleteForbidden = await request(testApp)
      .delete(`${TODOS_ENDPOINT}/${todoId}`)
      .set('Authorization', `Bearer ${tokenOther}`);

    expect(deleteForbidden.status).toBe(404);

    const deleteOwner = await request(testApp)
      .delete(`${TODOS_ENDPOINT}/${todoId}`)
      .set('Authorization', `Bearer ${tokenOwner}`);

    expect(deleteOwner.status).toBe(204);
  });

  it('rejects creating a todo without required title', async () => {
    const token = await createUserAndGetToken('todo-validation@example.com');

    const response = await request(testApp)
      .post(TODOS_ENDPOINT)
      .set('Authorization', `Bearer ${token}`)
      .send({});

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      message: 'Validation error',
      statusCode: 400,
    });
    expect(Array.isArray(response.body.details)).toBe(true);
  });

  it('rejects invalid pagination parameters', async () => {
    const token = await createUserAndGetToken('todo-pagination@example.com');

    const response = await request(testApp)
      .get(`${TODOS_ENDPOINT}?page=0&limit=abc`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      message: 'Validation error',
      statusCode: 400,
    });
  });

  it('rejects empty update body', async () => {
    const token = await createUserAndGetToken('todo-empty-update@example.com');

    const createResponse = await request(testApp)
      .post(TODOS_ENDPOINT)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'To be updated' });

    const todoId = createResponse.body._id as string;

    const response = await request(testApp)
      .put(`${TODOS_ENDPOINT}/${todoId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({});

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      message: 'Validation error',
      statusCode: 400,
    });
  });
});

