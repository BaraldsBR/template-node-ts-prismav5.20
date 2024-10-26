import { inject, injectable } from 'tsyringe';

import { Users } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../infra/repositories/interfaces/IUsersRepository';

interface IRequest {
  id: string;
  name?: string;
  email?: string;
  cpf?: string;
  phone?: string;
  password?: string;
}

@injectable()
export default class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) { }

  public async execute({
    id, cpf, email, name, password, phone,
  }: IRequest): Promise<Users> {
    if (cpf) {
      const userAlreadyExists = await this.usersRepository.findByCpf(cpf);
      if (userAlreadyExists && userAlreadyExists.id !== id) throw new AppError('User with same name, phone or cpf already exists');
    }

    if (email) {
      const userAlreadyExists = await this.usersRepository.findByEmail(email);
      if (userAlreadyExists && userAlreadyExists.id !== id) throw new AppError('User with same name, phone or cpf already exists');
    }

    if (phone) {
      const userAlreadyExists = await this.usersRepository.findByPhone(phone);
      if (userAlreadyExists && userAlreadyExists.id !== id) throw new AppError('User with same name, phone or cpf already exists');
    }

    let hashedPassword;
    if (password) await this.hashProvider.generateHash(password);

    const updatedUser = await this.usersRepository.update(id, {
      cpf,
      email: email?.toLowerCase(),
      name,
      phone,
      password: hashedPassword,
    });

    return updatedUser;
  }
}
