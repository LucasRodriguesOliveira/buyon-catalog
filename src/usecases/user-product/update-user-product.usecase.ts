import { UserProductModel } from 'src/domain/model/user-product.model';
import { IUserProductRepository } from 'src/domain/repository/user-product-repository.interface';

export class UpdateUserProductUseCase {
  constructor(private readonly repository: IUserProductRepository) {}

  public async run(
    userProductId: bigint,
    active: boolean,
  ): Promise<UserProductModel> {
    return this.repository.update(userProductId, active);
  }
}
