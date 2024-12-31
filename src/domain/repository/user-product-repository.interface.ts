import { UserProductModel } from '../model/user-product.model';

export interface IUserProductRepository {
  insert(userId: string, productId: number): Promise<UserProductModel>;
  findAll(userId?: string, productId?: number): Promise<UserProductModel[]>;
  findById(userProductId: bigint): Promise<UserProductModel>;
  update(userProductId: bigint, active: boolean): Promise<UserProductModel>;
  deleteById(userProductId: bigint): Promise<UserProductModel>;
}
