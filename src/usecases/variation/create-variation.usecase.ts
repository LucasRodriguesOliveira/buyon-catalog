import { VariationModel } from 'src/domain/model/variation.model';
import { IVariationRepository } from 'src/domain/repository/variation-repository.interface';

export class CreateVariationUseCase {
  constructor(private readonly repository: IVariationRepository) {}

  public async run(
    variationData: Partial<VariationModel>,
  ): Promise<VariationModel> {
    return this.repository.insert(variationData);
  }
}
