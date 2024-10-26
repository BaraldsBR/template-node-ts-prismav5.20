import { Users } from '@prisma/client';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUpdateUserDTO from '@modules/users/dtos/IUpdateUserDTO';

interface IUsersRepository {
  findByEmail(email: string): Promise<Users | null>;
  findByCpf(cpf: string): Promise<Users | null>;
  findByPhone(cpf: string): Promise<Users | null>;
  findByEmailPhoneOrCpf(email: string, phone: string, cpf: string): Promise<Users | null>;
  create(data: ICreateUserDTO): Promise<Users>;
  update(id: string, data: IUpdateUserDTO): Promise<Users>;
}

export default IUsersRepository;
