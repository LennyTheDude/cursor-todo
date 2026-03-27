export const env = {
  port: Number(process.env.PORT ?? 3000),
  mongoUri: process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017/todo-app',
  jwtSecret: process.env.JWT_SECRET ?? 'change-me-in-production',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? '1h',
};
