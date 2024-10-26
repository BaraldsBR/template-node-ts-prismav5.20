import prisma from '@shared/infra/prisma/client';
import { Users } from '@prisma/client';

import IUsersRepository from '@modules/users/infra/repositories/interfaces/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUpdateUserDTO from '@modules/users/dtos/IUpdateUserDTO';

export default class UsersRepository implements IUsersRepository {
  private ormRepository;

  constructor() {
    this.ormRepository = prisma.users;
  }

  public async findByEmail(email: string): Promise<Users | null> {
    const user = await this.ormRepository.findFirst({
      where: { email },
    });

    return user;
  }

  public async findByCpf(cpf: string): Promise<Users | null> {
    const user = await this.ormRepository.findFirst({
      where: { cpf },
    });

    return user;
  }

  public async findByPhone(phone: string): Promise<Users | null> {
    const user = await this.ormRepository.findFirst({
      where: { phone },
    });

    return user;
  }

  public async findByEmailPhoneOrCpf(email: string, phone: string, cpf: string): Promise<Users | null> {
    const user = await this.ormRepository.findFirst({
      where: { OR: [{ email }, { phone }, { cpf }] },
    });

    return user;
  }

  public async findById(id: string): Promise<Users | null> {
    const user = await this.ormRepository.findUnique({
      where: { id },
    });

    return user;
  }

  public async create(data: ICreateUserDTO): Promise<Users> {
    const user = await this.ormRepository.create({ data });

    return user;
  }

  public async update(id: string, data: IUpdateUserDTO): Promise<Users> {
    const user = await this.ormRepository.update({ where: { id }, data });

    return user;
  }
}
