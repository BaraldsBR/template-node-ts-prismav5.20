import ensureAuthenticated from '@shared/infra/http/middlewares/EnsureAuthenticated';
import verifyValidationResult from '@shared/infra/http/middlewares/VerifyValidationResults';
import { Router } from 'express';

import UsersController from '../controller/UsersController';

import userSchemas from '../schema';

const usersRoutes = Router();

const usersController = new UsersController();

usersRoutes.post('/register', userSchemas.create, verifyValidationResult, usersController.create);

usersRoutes.patch('/update', userSchemas.update, verifyValidationResult, ensureAuthenticated, usersController.update);

export default usersRoutes;
