import { Provider } from '@nestjs/common';
import { CreateUserProductProxy } from './create-user-product.proxy';
import { FindAllUserProductsProxy } from './find-all-user-products.proxy';
import { FindUserProductByIdProxy } from './find-user-product-by-id.proxy';
import { UpdateUserProductProxy } from './update-user-product.proxy';
import { DeleteUserProductByIdProxy } from './delete-user-product-by-id.proxy';

export const UserProductProxy: Map<symbol, Provider> = new Map([
  CreateUserProductProxy.Entry,
  FindAllUserProductsProxy.Entry,
  FindUserProductByIdProxy.Entry,
  UpdateUserProductProxy.Entry,
  DeleteUserProductByIdProxy.Entry,
]);
