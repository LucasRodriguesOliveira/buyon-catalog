import { Provider } from '@nestjs/common';
import { IVariationItemRepository } from 'src/domain/repository/variation-item-repository.interface';
import { VariationItemRepository } from 'src/infrastructure/repository/variation-item.repository';
import { FindAllVariationItemsUseCase } from 'src/usecases/variation-item/find-all-variation-items.usecase';
import { Proxy } from '../../proxy';

const token = Symbol('__FIND_ALL_VARIATION_ITEMS_USE_CASE__');
const provider: Provider = {
  inject: [VariationItemRepository],
  provide: token,
  useFactory: (repository: IVariationItemRepository) =>
    new FindAllVariationItemsUseCase(repository),
};

export const FindAllVariationItemsProxy = new Proxy(token, provider);
