import { Provider } from '@nestjs/common';
import { IUserProductRepository } from 'src/domain/repository/user-product-repository.interface';
import { UserProductRepository } from 'src/infrastructure/repository/user-product.repository';
import { CreateUserProductUseCase } from 'src/usecases/user-product/create-user-product.usecase';
import { Proxy } from '../../proxy';

const token = Symbol('__CREATE_USER_PRODUCT_USE_CASE__');
const provider: Provider = {
  inject: [UserProductRepository],
  provide: token,
  useFactory: (repository: IUserProductRepository) =>
    new CreateUserProductUseCase(repository),
};

export const CreateUserProductProxy = new Proxy(token, provider);
