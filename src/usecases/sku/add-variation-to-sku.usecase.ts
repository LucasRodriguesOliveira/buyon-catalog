import { SKUVariationModel } from 'src/domain/model/sku-variation.model';
import { ISKUVariationRepository } from 'src/domain/repository/sku-variation-repository.interface';

export class AddVariationToSKUUseCase {
  constructor(
    private readonly skuVariationRepository: ISKUVariationRepository,
  ) {}

  public async run(
    skuVariationData: Partial<SKUVariationModel>,
  ): Promise<SKUVariationModel> {
    return this.skuVariationRepository.insert(skuVariationData);
  }
}
