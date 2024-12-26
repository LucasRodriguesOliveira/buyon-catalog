import { Provider } from '@nestjs/common';
import { ProductRepository } from 'src/infrastructure/repository/product.repository';
import { UpdateProductByIdUseCase } from 'src/usecases/product/update-product-by-id.usecase';
import { Proxy } from '../../proxy';

const token = Symbol('__UPDATE_PRODUCT_BY_ID_USE_CASE__');
const provider: Provider = {
  inject: [ProductRepository],
  provide: token,
  useFactory: (repository: ProductRepository) =>
    new UpdateProductByIdUseCase(repository),
};

export const UpdateProductByIdProxy = new Proxy(token, provider);
