import { ProductModel } from 'src/domain/model/product.model';
import { IProductRepository } from 'src/domain/repository/product-repository.interface';

export class UpdateProductByIdUseCase {
  constructor(private readonly repository: IProductRepository) {}

  public async run(
    productId: number,
    updateProductDto: Partial<ProductModel>,
  ): Promise<ProductModel> {
    return this.repository.update(productId, updateProductDto);
  }
}
