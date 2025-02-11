import { SKUModel } from 'src/domain/model/sku.model';
import { ISKURepository } from 'src/domain/repository/sku-repository.interface';

export class FindAllSKUSUseCase {
  constructor(private readonly skuRepository: ISKURepository) {}

  public async run(): Promise<SKUModel[]> {
    return this.skuRepository.findAll();
  }
}
