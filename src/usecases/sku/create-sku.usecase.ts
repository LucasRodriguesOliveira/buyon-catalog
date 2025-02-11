import { SKUModel } from 'src/domain/model/sku.model';
import { ISKURepository } from 'src/domain/repository/sku-repository.interface';

export class CreateSKUUseCase {
  constructor(private readonly skuRepository: ISKURepository) {}

  public async run(skuData: Partial<SKUModel>): Promise<SKUModel> {
    return this.skuRepository.insert(skuData);
  }
}
