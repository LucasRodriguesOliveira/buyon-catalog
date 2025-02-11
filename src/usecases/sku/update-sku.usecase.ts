import { SKUModel } from 'src/domain/model/sku.model';
import { ISKURepository } from 'src/domain/repository/sku-repository.interface';

export class UpdateSKUUseCase {
  constructor(private readonly skuRepository: ISKURepository) {}

  public async run(
    skuId: bigint,
    skuData: Partial<SKUModel>,
  ): Promise<SKUModel> {
    return this.skuRepository.update(skuId, skuData);
  }
}
