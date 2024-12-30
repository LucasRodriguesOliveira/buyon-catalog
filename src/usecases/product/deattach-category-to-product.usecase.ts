import { ProductModel } from 'src/domain/model/product.model';
import { IProductRepository } from 'src/domain/repository/product-repository.interface';

export class DeattachCategoryToProductUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  public async run(
    productId: number,
    categoryId: number,
  ): Promise<ProductModel> {
    return this.productRepository.deattachCategory(productId, categoryId);
  }
}
