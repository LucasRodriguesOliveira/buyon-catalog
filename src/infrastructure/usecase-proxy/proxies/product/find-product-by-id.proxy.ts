import { Provider } from '@nestjs/common';
import { ProductRepository } from 'src/infrastructure/repository/product.repository';
import { FindProductByIdUseCase } from 'src/usecases/product/find-product-by-id.usecase';
import { Proxy } from '../../proxy';

const token = Symbol('__FIND_PRODUCT_BY_ID_USE_CASE__');
const provider: Provider = {
  inject: [ProductRepository],
  provide: token,
  useFactory: (repository: ProductRepository) =>
    new FindProductByIdUseCase(repository),
};

export const FindProductByIdProxy = new Proxy(token, provider);
