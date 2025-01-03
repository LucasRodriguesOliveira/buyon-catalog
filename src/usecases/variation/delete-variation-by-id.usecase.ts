import { VariationModel } from 'src/domain/model/variation.model';
import { IVariationRepository } from 'src/domain/repository/variation-repository.interface';

export class DeleteVariationByIdUseCase {
  constructor(private readonly repository: IVariationRepository) {}

  public async run(variationId: number): Promise<VariationModel> {
    return this.repository.deleteById(variationId);
  }
}
