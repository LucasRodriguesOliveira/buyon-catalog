import { ProductModel } from 'src/domain/model/product.model';
import { IProductRepository } from 'src/domain/repository/product-repository.interface';

export class FindProductByIdUseCase {
  constructor(private readonly repository: IProductRepository) {}

  public async run(productId: number): Promise<ProductModel> {
    return this.repository.findById(productId);
  }
}
