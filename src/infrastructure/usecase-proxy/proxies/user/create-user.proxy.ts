import { Provider } from '@nestjs/common';
import { IUserRepository } from 'src/domain/repository/user-repository.interface';
import { UserRepository } from 'src/infrastructure/repository/user.repository';
import { CreateUserUseCase } from 'src/usecases/user/create-user.usecase';
import { Proxy } from '../../proxy';

const token = Symbol('__CREATE_USER_USE_CASE__');
const provider: Provider = {
  inject: [UserRepository],
  provide: token,
  useFactory: (repository: IUserRepository) =>
    new CreateUserUseCase(repository),
};

export const CreateUserProxy = new Proxy(token, provider);
