import { Provider } from '@nestjs/common';
import { IProductRepository } from 'src/domain/repository/product-repository.interface';
import { ProductRepository } from 'src/infrastructure/repository/product.repository';
import { Proxy } from '../../proxy';
import { DeattachCategoryToProductUseCase } from 'src/usecases/product/deattach-category-to-product.usecase';

const token = Symbol('__DEATTACH_CATEGORY_TO_PRODUCT_USE_CASE__');
const provider: Provider = {
  inject: [ProductRepository],
  provide: token,
  useFactory: (productRepository: IProductRepository) =>
    new DeattachCategoryToProductUseCase(productRepository),
};

export const DeattachCategoryToProductProxy = new Proxy(token, provider);
