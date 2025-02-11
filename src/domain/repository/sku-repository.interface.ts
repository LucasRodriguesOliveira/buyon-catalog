import { SKUModel } from '../model/sku.model';

export interface ISKURepository {
  insert(skuData: Partial<SKUModel>): Promise<SKUModel>;
  findAll(): Promise<SKUModel[]>;
  findById(skuId: bigint): Promise<SKUModel>;
  update(skuId: bigint, skuData: Partial<SKUModel>): Promise<SKUModel>;
  deleteById(skuId: bigint): Promise<SKUModel>;
}
