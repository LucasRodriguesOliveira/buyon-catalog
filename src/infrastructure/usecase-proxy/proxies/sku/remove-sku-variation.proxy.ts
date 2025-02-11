import { Provider } from '@nestjs/common';
import { ISKUVariationRepository } from 'src/domain/repository/sku-variation-repository.interface';
import { SKUVariationRepository } from 'src/infrastructure/repository/sku-variation.repository';
import { RemoveSKUVariationUseCase } from 'src/usecases/sku/remove-sku-variation.usecase';
import { Proxy } from '../../proxy';

const token = Symbol('__REMOVE_SKU_VARIATION_USE_CASE__');
const provider: Provider = {
  inject: [SKUVariationRepository],
  provide: token,
  useFactory: (repository: ISKUVariationRepository) =>
    new RemoveSKUVariationUseCase(repository),
};

export const RemoveSKUVariationProxy = new Proxy(token, provider);
