import { Provider } from '@nestjs/common';
import { ISKURepository } from 'src/domain/repository/sku-repository.interface';
import { SKURepository } from 'src/infrastructure/repository/sku.repository';
import { DeleteSKUByIdUseCase } from 'src/usecases/sku/delete-sku-by-id.usecase';
import { Proxy } from '../../proxy';

const token = Symbol('__DELETE_SKU_BY_ID_USE_CASE__');
const provider: Provider = {
  inject: [SKURepository],
  provide: token,
  useFactory: (skuRepository: ISKURepository) =>
    new DeleteSKUByIdUseCase(skuRepository),
};

export const DeleteSKUByIdProxy = new Proxy(token, provider);
