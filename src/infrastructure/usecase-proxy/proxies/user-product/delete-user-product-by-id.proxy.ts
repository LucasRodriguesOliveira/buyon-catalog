import { Provider } from '@nestjs/common';
import { IUserProductRepository } from 'src/domain/repository/user-product-repository.interface';
import { UserProductRepository } from 'src/infrastructure/repository/user-product.repository';
import { DeleteUserProductByIdUseCase } from 'src/usecases/user-product/delete-user-product-by-id.usecase';
import { Proxy } from '../../proxy';

const token = Symbol('__DELETE_USER_PRODUCT_BY_ID__');
const provider: Provider = {
  inject: [UserProductRepository],
  provide: token,
  useFactory: (repository: IUserProductRepository) =>
    new DeleteUserProductByIdUseCase(repository),
};

export const DeleteUserProductByIdProxy = new Proxy(token, provider);
