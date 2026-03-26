import { Router } from 'express';
import {
  createTodoController,
  deleteTodoController,
  getTodoByIdController,
  getTodosController,
  updateTodoController,
} from '../controllers/todo.controller';

const todoRouter = Router();

todoRouter.get('/', getTodosController);
todoRouter.get('/:id', getTodoByIdController);
todoRouter.post('/', createTodoController);
todoRouter.put('/:id', updateTodoController);
todoRouter.delete('/:id', deleteTodoController);

export default todoRouter;
