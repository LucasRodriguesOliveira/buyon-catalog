import { VariationType } from 'src/domain/model/variation-type.model';
import { IVariationTypeRepository } from 'src/domain/repository/variation-type-repository.interface';

export class UpdateVariationTypeUseCase {
  constructor(private readonly repository: IVariationTypeRepository) {}

  public async run(
    variationTypeId: number,
    variationTypeData: Partial<VariationType>,
  ): Promise<VariationType> {
    return this.repository.update(variationTypeId, variationTypeData);
  }
}
