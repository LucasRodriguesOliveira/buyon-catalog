import { VariationType } from 'src/domain/model/variation-type.model';
import { IVariationTypeRepository } from 'src/domain/repository/variation-type-repository.interface';

export class CreateVariationTypeUseCase {
  constructor(private readonly repository: IVariationTypeRepository) {}

  public async run(
    variationTypeData: Partial<VariationType>,
  ): Promise<VariationType> {
    return this.repository.insert(variationTypeData);
  }
}
