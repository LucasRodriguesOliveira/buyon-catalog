import { UserProductModel } from 'src/domain/model/user-product.model';
import { IUserProductRepository } from 'src/domain/repository/user-product-repository.interface';

export class DeleteUserProductByIdUseCase {
  constructor(private readonly repository: IUserProductRepository) {}

  public async run(userProductId: bigint): Promise<UserProductModel> {
    return this.repository.deleteById(userProductId);
  }
}
