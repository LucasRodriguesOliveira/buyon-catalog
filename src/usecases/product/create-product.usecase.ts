import { ProductModel } from 'src/domain/model/product.model';
import { IProductRepository } from 'src/domain/repository/product-repository.interface';

export class CreateProductUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async run(product: Partial<ProductModel>): Promise<ProductModel> {
    return this.productRepository.insert(product);
  }
}
