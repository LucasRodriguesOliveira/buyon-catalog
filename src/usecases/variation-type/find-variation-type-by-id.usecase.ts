import { VariationType } from 'src/domain/model/variation-type.model';
import { IVariationTypeRepository } from 'src/domain/repository/variation-type-repository.interface';

export class FindVariationTypeByIdUseCase {
  constructor(private readonly repository: IVariationTypeRepository) {}

  public async run(variationTypeId: number): Promise<VariationType> {
    return this.repository.findById(variationTypeId);
  }
}
