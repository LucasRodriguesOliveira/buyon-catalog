import { Provider } from '@nestjs/common';
import { ISKURepository } from 'src/domain/repository/sku-repository.interface';
import { SKURepository } from 'src/infrastructure/repository/sku.repository';
import { FindAllSKUSUseCase } from 'src/usecases/sku/find-all-skus.usecase';
import { Proxy } from '../../proxy';

const token = Symbol('__FIND_ALL_SKUS_USE_CASE__');
const provider: Provider = {
  inject: [SKURepository],
  provide: token,
  useFactory: (skuRepository: ISKURepository) =>
    new FindAllSKUSUseCase(skuRepository),
};

export const FindAllSKUSProxy = new Proxy(token, provider);
