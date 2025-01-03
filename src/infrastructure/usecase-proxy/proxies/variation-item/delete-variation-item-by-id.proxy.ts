import { Provider } from '@nestjs/common';
import { IVariationItemRepository } from 'src/domain/repository/variation-item-repository.interface';
import { VariationItemRepository } from 'src/infrastructure/repository/variation-item.repository';
import { DeleteVariationItemByIdUseCase } from 'src/usecases/variation-item/delete-variation-item-by-id.usecase';
import { Proxy } from '../../proxy';

const token = Symbol('__DELETE_VARIATION_ITEM_BY_ID_USE_CASE__');
const provider: Provider = {
  inject: [VariationItemRepository],
  provide: token,
  useFactory: (repository: IVariationItemRepository) =>
    new DeleteVariationItemByIdUseCase(repository),
};

export const DeleteVariationItemByIdProxy = new Proxy(token, provider);
