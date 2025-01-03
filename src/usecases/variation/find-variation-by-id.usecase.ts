import { VariationModel } from 'src/domain/model/variation.model';
import { IVariationRepository } from 'src/domain/repository/variation-repository.interface';

export class FindVariationByIdUseCase {
  constructor(private readonly repository: IVariationRepository) {}

  public async run(variationId: number): Promise<VariationModel> {
    return this.repository.findById(variationId);
  }
}
