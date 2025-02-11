import { Provider } from '@nestjs/common';
import { ISKUVariationRepository } from 'src/domain/repository/sku-variation-repository.interface';
import { SKUVariationRepository } from 'src/infrastructure/repository/sku-variation.repository';
import { AddVariationToSKUUseCase } from 'src/usecases/sku/add-variation-to-sku.usecase';
import { Proxy } from '../../proxy';

const token = Symbol('__ADD_VARIATION_TO_SKU_USE_CASE__');
const provider: Provider = {
  inject: [SKUVariationRepository],
  provide: token,
  useFactory: (repository: ISKUVariationRepository) =>
    new AddVariationToSKUUseCase(repository),
};

export const AddVariationToSKUProxy = new Proxy(token, provider);
