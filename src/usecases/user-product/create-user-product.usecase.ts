import { UserProductModel } from 'src/domain/model/user-product.model';
import { IUserProductRepository } from 'src/domain/repository/user-product-repository.interface';

export class CreateUserProductUseCase {
  constructor(private readonly repository: IUserProductRepository) {}

  public async run({ userId, productId }: Partial<UserProductModel>) {
    return this.repository.insert(userId, productId);
  }
}
