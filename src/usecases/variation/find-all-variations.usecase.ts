import { VariationModel } from 'src/domain/model/variation.model';
import { IVariationRepository } from 'src/domain/repository/variation-repository.interface';

export class FindAllVariationsUseCase {
  constructor(private readonly repository: IVariationRepository) {}

  public async run(): Promise<VariationModel[]> {
    return this.repository.findAll();
  }
}
