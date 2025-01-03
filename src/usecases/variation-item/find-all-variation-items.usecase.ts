import { VariationItemModel } from 'src/domain/model/variation-item.model';
import { IVariationItemRepository } from 'src/domain/repository/variation-item-repository.interface';

export class FindAllVariationItemsUseCase {
  constructor(private readonly repository: IVariationItemRepository) {}

  public async run(variationId: number): Promise<VariationItemModel[]> {
    return this.repository.findAll(variationId);
  }
}
