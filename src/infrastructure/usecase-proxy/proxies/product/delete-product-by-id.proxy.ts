import { Provider } from '@nestjs/common';
import { ProductRepository } from 'src/infrastructure/repository/product.repository';
import { DeleteProductByIdUseCase } from 'src/usecases/product/delete-product-by-id.usecase';
import { Proxy } from '../../proxy';

const token = Symbol('__DELETE_PRODUCT_BY_ID_USE_CASE__');
const provider: Provider = {
  inject: [ProductRepository],
  provide: token,
  useFactory: (repository: ProductRepository) =>
    new DeleteProductByIdUseCase(repository),
};

export const DeleteProductByIdProxy = new Proxy(token, provider);
