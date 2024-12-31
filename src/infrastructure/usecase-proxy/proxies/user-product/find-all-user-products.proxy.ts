import { Provider } from '@nestjs/common';
import { IUserProductRepository } from 'src/domain/repository/user-product-repository.interface';
import { UserProductRepository } from 'src/infrastructure/repository/user-product.repository';
import { FindAllUserProductsUseCase } from 'src/usecases/user-product/find-all-user-products.usecase';
import { Proxy } from '../../proxy';

const token = Symbol('__FIND_ALL_USER_PRODUCTS_USE_CASE__');
const provider: Provider = {
  inject: [UserProductRepository],
  provide: token,
  useFactory: (repository: IUserProductRepository) =>
    new FindAllUserProductsUseCase(repository),
};

export const FindAllUserProductsProxy = new Proxy(token, provider);
