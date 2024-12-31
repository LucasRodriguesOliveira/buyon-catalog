import { UserProductModel } from 'src/domain/model/user-product.model';
import { IUserProductRepository } from 'src/domain/repository/user-product-repository.interface';

export class FindAllUserProductsUseCase {
  constructor(private readonly repository: IUserProductRepository) {}

  public async run(
    userId?: string,
    productId?: number,
  ): Promise<UserProductModel[]> {
    return this.repository.findAll(userId, productId);
  }
}
