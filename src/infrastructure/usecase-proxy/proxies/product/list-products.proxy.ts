import { Provider } from '@nestjs/common';
import { ProductRepository } from 'src/infrastructure/repository/product.repository';
import { ListProductsUseCase } from 'src/usecases/product/list-products.usecase';
import { Proxy } from '../../proxy';

const token = Symbol('__LIST_PRODUCTS_USE_CASE__');
const provider: Provider = {
  inject: [ProductRepository],
  provide: token,
  useFactory: (repository: ProductRepository) =>
    new ListProductsUseCase(repository),
};

export const ListProductsProxy = new Proxy(token, provider);
