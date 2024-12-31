import { Provider } from '@nestjs/common';
import { IUserProductRepository } from 'src/domain/repository/user-product-repository.interface';
import { UserProductRepository } from 'src/infrastructure/repository/user-product.repository';
import { FindUserProductByIdUseCase } from 'src/usecases/user-product/find-user-product-by-id.usecase';
import { Proxy } from '../../proxy';

const token = Symbol('__FIND_USER_PRODUCT_BY_ID_USE_CASE__');
const provider: Provider = {
  inject: [UserProductRepository],
  provide: token,
  useFactory: (repository: IUserProductRepository) =>
    new FindUserProductByIdUseCase(repository),
};

export const FindUserProductByIdProxy = new Proxy(token, provider);
