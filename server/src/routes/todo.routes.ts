import { Router } from 'express';
import {
  createTodoController,
  deleteTodoController,
  getTodoByIdController,
  getTodosController,
  updateTodoController,
} from '../controllers/todo.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate';
import { createTodoSchema, listTodosQuerySchema, updateTodoSchema } from '../validators/todo.validator';

const todoRouter = Router();

todoRouter.use(authMiddleware);

todoRouter.get('/', validate(listTodosQuerySchema, 'query'), getTodosController);
todoRouter.get('/:id', getTodoByIdController);
todoRouter.post('/', validate(createTodoSchema, 'body'), createTodoController);
todoRouter.put('/:id', validate(updateTodoSchema, 'body'), updateTodoController);
todoRouter.delete('/:id', deleteTodoController);

export default todoRouter;
