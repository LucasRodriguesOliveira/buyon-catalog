import { VariationType } from 'src/domain/model/variation-type.model';
import { IVariationTypeRepository } from 'src/domain/repository/variation-type-repository.interface';

export class FindAllVariationTypesUseCase {
  constructor(private readonly repository: IVariationTypeRepository) {}

  public async run(): Promise<VariationType[]> {
    return this.repository.findAll();
  }
}
