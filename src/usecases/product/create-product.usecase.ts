import { ProductModel } from 'src/domain/model/product.model';
import { IProductRepository } from 'src/domain/repository/product-repository.interface';

export class CreateProductUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async run(product: Partial<ProductModel>): Promise<ProductModel> {
    const { categories, ...productData } = product;

    const productCreated = await this.productRepository.insert(productData);

    const results = await Promise.all(
      categories.map((category) => {
        return this.productRepository.attachCategory(
          productCreated.id,
          category.id,
        );
      }),
    );

    return results.pop();
  }
}
