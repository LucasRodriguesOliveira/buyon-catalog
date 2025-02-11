import { SKUVariationModel } from 'src/domain/model/sku-variation.model';
import { ISKUVariationRepository } from 'src/domain/repository/sku-variation-repository.interface';

export class RemoveSKUVariationUseCase {
  constructor(
    private readonly skuVariationRepository: ISKUVariationRepository,
  ) {}

  public async run(
    skuId: bigint,
    variationId: bigint,
  ): Promise<SKUVariationModel> {
    return this.skuVariationRepository.delete(skuId, variationId);
  }
}
