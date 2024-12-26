import { Provider } from '@nestjs/common';
import { ProductRepository } from 'src/infrastructure/repository/product.repository';
import { CreateProductUseCase } from 'src/usecases/product/create-product.usecase';
import { Proxy } from '../../proxy';

const token = Symbol('__CREATE_PRODUCT_USE_CASE__');
const provider: Provider = {
  inject: [ProductRepository],
  provide: token,
  useFactory: (repository: ProductRepository) =>
    new CreateProductUseCase(repository),
};

export const CreateProductProxy = new Proxy(token, provider);
