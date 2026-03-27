import pino from 'pino';
import { env } from './env';

const isTestEnv = env.nodeEnv === 'test';
const isDevEnv = env.nodeEnv === 'development';

export const logger = pino({
  level: env.logLevel,
  transport: isDevEnv && !isTestEnv ? { target: 'pino-pretty', options: { colorize: true } } : undefined,
});

