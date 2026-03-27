import { Router } from 'express';
import { loginController, registerController } from '../controllers/auth.controller';
import { validate } from '../middleware/validate';
import { authSchema } from '../validators/auth.validator';

const authRouter = Router();

authRouter.post('/register', validate(authSchema, 'body'), registerController);
authRouter.post('/login', validate(authSchema, 'body'), loginController);

export default authRouter;
