import { ProductModel } from './product.model';
import { UserModel } from './user.model';

export class UserProductModel {
  id: bigint;
  userId: string;
  productId: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;

  user: UserModel;
  product: ProductModel;
}
