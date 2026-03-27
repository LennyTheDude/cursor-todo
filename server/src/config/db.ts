import mongoose from 'mongoose';
import { env } from './env';
import { logger } from './logger';

export const connectToDatabase = async (): Promise<void> => {
  await mongoose.connect(env.mongoUri);
  // Intentionally avoid logging full connection URI to prevent leaking credentials.
  logger.info('Connected to MongoDB');
};
