import { VariationItemModel } from 'src/domain/model/variation-item.model';
import { IVariationItemRepository } from 'src/domain/repository/variation-item-repository.interface';

export class UpdateVariationItemUseCase {
  constructor(private readonly repository: IVariationItemRepository) {}

  public async run(
    variationItemId: number,
    variationItemData: Partial<VariationItemModel>,
  ): Promise<VariationItemModel> {
    return this.repository.update(variationItemId, variationItemData);
  }
}
