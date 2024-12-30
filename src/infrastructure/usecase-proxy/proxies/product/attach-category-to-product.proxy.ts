import { Provider } from '@nestjs/common';
import { IProductRepository } from 'src/domain/repository/product-repository.interface';
import { ProductRepository } from 'src/infrastructure/repository/product.repository';
import { AttachCategoryToProductUseCase } from 'src/usecases/product/attach-category-to-product.usecase';
import { Proxy } from '../../proxy';

const token = Symbol('__ATTACH_CATEGORY_TO_PRODUCT_USE_CASE__');
const provider: Provider = {
  inject: [ProductRepository],
  provide: token,
  useFactory: (productRepository: IProductRepository) =>
    new AttachCategoryToProductUseCase(productRepository),
};

export const AttachCategoryToProductProxy = new Proxy(token, provider);
