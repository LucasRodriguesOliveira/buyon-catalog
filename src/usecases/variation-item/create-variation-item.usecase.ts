import { VariationItemModel } from 'src/domain/model/variation-item.model';
import { IVariationItemRepository } from 'src/domain/repository/variation-item-repository.interface';

export class CreateVariationItemUseCase {
  constructor(private readonly repository: IVariationItemRepository) {}

  public async run(
    variationItemData: Partial<VariationItemModel>,
  ): Promise<VariationItemModel> {
    return this.repository.insert(variationItemData);
  }
}
