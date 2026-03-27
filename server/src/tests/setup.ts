import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../app';

let mongoServer: MongoMemoryServer;

export const testApp = app;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  process.env.MONGO_URI = uri;
  process.env.JWT_SECRET = 'test-secret';
  process.env.NODE_ENV = 'test';

  await mongoose.connect(uri);
});

beforeEach(async () => {
  const db = mongoose.connection.db;
  if (!db) {
    return;
  }

  const collections = await db.collections();
  await Promise.all(collections.map((collection) => collection.deleteMany({})));
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

