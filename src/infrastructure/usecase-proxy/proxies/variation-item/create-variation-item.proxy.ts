import { Provider } from '@nestjs/common';
import { IVariationItemRepository } from 'src/domain/repository/variation-item-repository.interface';
import { VariationItemRepository } from 'src/infrastructure/repository/variation-item.repository';
import { CreateVariationItemUseCase } from 'src/usecases/variation-item/create-variation-item.usecase';
import { Proxy } from '../../proxy';

const token = Symbol('__CREATE_VARIATION_ITEM_USE_CASE__');
const provider: Provider = {
  inject: [VariationItemRepository],
  provide: token,
  useFactory: (repository: IVariationItemRepository) =>
    new CreateVariationItemUseCase(repository),
};

export const CreateVariationItemProxy = new Proxy(token, provider);
