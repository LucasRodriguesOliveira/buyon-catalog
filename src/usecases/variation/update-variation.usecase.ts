import { VariationModel } from 'src/domain/model/variation.model';
import { IVariationRepository } from 'src/domain/repository/variation-repository.interface';

export class UpdateVariationUseCase {
  constructor(private readonly repository: IVariationRepository) {}

  public async run(
    variationId: number,
    variationData: Partial<VariationModel>,
  ): Promise<VariationModel> {
    return this.repository.update(variationId, variationData);
  }
}
