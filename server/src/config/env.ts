const nodeEnv = (process.env.NODE_ENV ?? 'development') as 'development' | 'test' | 'production';

export const env = {
  nodeEnv,
  port: Number(process.env.PORT ?? 3000),
  mongoUri:
    process.env.MONGO_URI ??
    (nodeEnv === 'test' ? 'mongodb://127.0.0.1:27017/todo-app-test' : 'mongodb://127.0.0.1:27017/todo-app'),
  jwtSecret:
    process.env.JWT_SECRET ??
    (nodeEnv === 'test' ? 'test-secret' : (() => {
      throw new Error('JWT_SECRET must be set in non-test environments');
    })()),
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? '1h',
  logLevel: process.env.LOG_LEVEL ?? (nodeEnv === 'development' ? 'debug' : 'info'),
};
