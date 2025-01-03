import { VariationItemModel } from 'src/domain/model/variation-item.model';
import { IVariationItemRepository } from 'src/domain/repository/variation-item-repository.interface';

export class DeleteVariationItemByIdUseCase {
  constructor(private readonly repository: IVariationItemRepository) {}

  public async run(variationItemId: number): Promise<VariationItemModel> {
    return this.repository.deleteById(variationItemId);
  }
}
