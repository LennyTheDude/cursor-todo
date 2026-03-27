import { Router } from 'express';
import {
  createTodoController,
  deleteTodoController,
  getTodoByIdController,
  getTodosController,
  updateTodoController,
} from '../controllers/todo.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const todoRouter = Router();

todoRouter.use(authMiddleware);

todoRouter.get('/', getTodosController);
todoRouter.get('/:id', getTodoByIdController);
todoRouter.post('/', createTodoController);
todoRouter.put('/:id', updateTodoController);
todoRouter.delete('/:id', deleteTodoController);

export default todoRouter;
