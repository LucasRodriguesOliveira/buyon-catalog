import { UserModel } from 'src/domain/model/user.model';
import { IUserRepository } from '../../domain/repository/user-repository.interface';

export class CreateUserUseCase {
  constructor(private readonly repository: IUserRepository) {}

  public async run(user: Partial<UserModel>): Promise<UserModel> {
    return this.repository.insert(user);
  }
}
