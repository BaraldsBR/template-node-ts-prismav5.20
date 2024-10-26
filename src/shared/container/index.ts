import { container } from 'tsyringe';

import './providers';

// Users
import IUsersRepository from '@modules/users/infra/repositories//interfaces/IUsersRepository';
import UsersRepository from '@modules/users/infra/repositories/implementations/UsersRepository';

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);
