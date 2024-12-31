import { Provider } from '@nestjs/common';
import { IUserProductRepository } from 'src/domain/repository/user-product-repository.interface';
import { UserProductRepository } from 'src/infrastructure/repository/user-product.repository';
import { UpdateUserProductUseCase } from 'src/usecases/user-product/update-user-product.usecase';
import { Proxy } from '../../proxy';

const token = Symbol('__UPDATE_USER_PRODUCT_USE_CASE__');
const provider: Provider = {
  inject: [UserProductRepository],
  provide: token,
  useFactory: (repository: IUserProductRepository) =>
    new UpdateUserProductUseCase(repository),
};

export const UpdateUserProductProxy = new Proxy(token, provider);
