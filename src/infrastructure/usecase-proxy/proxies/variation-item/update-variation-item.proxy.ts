import { Provider } from '@nestjs/common';
import { IVariationItemRepository } from 'src/domain/repository/variation-item-repository.interface';
import { VariationItemRepository } from 'src/infrastructure/repository/variation-item.repository';
import { UpdateVariationItemUseCase } from 'src/usecases/variation-item/update-variation-item.usecase';
import { Proxy } from '../../proxy';

const token = Symbol('__UPDATE_VARIATION_ITEM_USE_CASE__');
const provider: Provider = {
  inject: [VariationItemRepository],
  provide: token,
  useFactory: (repository: IVariationItemRepository) =>
    new UpdateVariationItemUseCase(repository),
};

export const UpdateVariationItemProxy = new Proxy(token, provider);
