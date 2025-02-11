import { Provider } from '@nestjs/common';
import { ISKURepository } from 'src/domain/repository/sku-repository.interface';
import { SKURepository } from 'src/infrastructure/repository/sku.repository';
import { UpdateSKUUseCase } from 'src/usecases/sku/update-sku.usecase';
import { Proxy } from '../../proxy';

const token = Symbol('__UPDATE_SKU_USE_CASE__');
const provider: Provider = {
  inject: [SKURepository],
  provide: token,
  useFactory: (skuRepository: ISKURepository) =>
    new UpdateSKUUseCase(skuRepository),
};

export const UpdateSKUProxy = new Proxy(token, provider);
