import { SKUVariationModel } from '../model/sku-variation.model';

export interface ISKUVariationRepository {
  insert(
    skuVariationData: Partial<SKUVariationModel>,
  ): Promise<SKUVariationModel>;
  findAll(skuId: bigint): Promise<SKUVariationModel[]>;
  delete(skuId: bigint, variationId: number): Promise<SKUVariationModel>;
}
