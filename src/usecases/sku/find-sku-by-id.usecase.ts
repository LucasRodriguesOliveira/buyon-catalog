import { SKUModel } from 'src/domain/model/sku.model';
import { ISKURepository } from 'src/domain/repository/sku-repository.interface';

export class FindSKUByIdUseCase {
  constructor(private readonly skuRepository: ISKURepository) {}

  public async run(skuId: bigint): Promise<SKUModel> {
    return this.skuRepository.findById(skuId);
  }
}
