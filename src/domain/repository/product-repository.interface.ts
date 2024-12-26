import { ProductModel } from '../model/product.model';

export interface IProductRepository {
  insert(product: Partial<ProductModel>): Promise<ProductModel>;
  findAll(): Promise<ProductModel[]>;
  findById(productId: number): Promise<ProductModel>;
  update(
    productId: number,
    productToUpdate: Partial<ProductModel>,
  ): Promise<ProductModel>;
  deleteById(productId: number): Promise<ProductModel>;
}
