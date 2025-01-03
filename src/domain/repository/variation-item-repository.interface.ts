import { VariationItemModel } from '../model/variation-item.model';

export interface IVariationItemRepository {
  insert(
    variationItemData: Partial<VariationItemModel>,
  ): Promise<VariationItemModel>;
  findAll(variationId: number): Promise<VariationItemModel[]>;
  update(
    variationItemId: number,
    variationItemData: Partial<VariationItemModel>,
  ): Promise<VariationItemModel>;
  deleteById(variationItemId: number): Promise<VariationItemModel>;
}
