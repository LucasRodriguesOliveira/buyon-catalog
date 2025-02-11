import { Provider } from '@nestjs/common';
import { ISKURepository } from 'src/domain/repository/sku-repository.interface';
import { SKURepository } from 'src/infrastructure/repository/sku.repository';
import { FindSKUByIdUseCase } from 'src/usecases/sku/find-sku-by-id.usecase';
import { Proxy } from '../../proxy';

const token = Symbol('__FIND_SKU_BY_ID_USE_CASE__');
const provider: Provider = {
  inject: [SKURepository],
  provide: token,
  useFactory: (skuRepository: ISKURepository) =>
    new FindSKUByIdUseCase(skuRepository),
};

export const FindSKUByIdProxy = new Proxy(token, provider);
