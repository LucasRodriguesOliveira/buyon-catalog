import { ProductModel } from 'src/domain/model/product.model';
import { IProductRepository } from 'src/domain/repository/product-repository.interface';

export class ListProductsUseCase {
  constructor(private readonly repository: IProductRepository) {}

  public async run(): Promise<ProductModel[]> {
    return this.repository.findAll();
  }
}
