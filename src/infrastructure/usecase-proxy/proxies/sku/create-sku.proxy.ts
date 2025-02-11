import { Provider } from '@nestjs/common';
import { ISKURepository } from 'src/domain/repository/sku-repository.interface';
import { SKURepository } from 'src/infrastructure/repository/sku.repository';
import { CreateSKUUseCase } from 'src/usecases/sku/create-sku.usecase';
import { Proxy } from '../../proxy';

const token = Symbol('__CREATE_SKU_USE_CASE__');
const provider: Provider = {
  inject: [SKURepository],
  provide: token,
  useFactory: (skuRepository: ISKURepository) =>
    new CreateSKUUseCase(skuRepository),
};

export const CreateSKUProxy = new Proxy(token, provider);
