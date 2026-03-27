import 'dotenv/config';
import app from './app';
import { connectToDatabase } from './config/db';
import { env } from './config/env';
import { logger } from './config/logger';

const startServer = async (): Promise<void> => {
  try {
    await connectToDatabase();

    app.listen(env.port, () => {
      logger.info({ port: env.port, env: env.nodeEnv }, 'Server listening');
    });
  } catch (error) {
    logger.error({ error }, 'Failed to start server');
    process.exit(1);
  }
};

void startServer();
