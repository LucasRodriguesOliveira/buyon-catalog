import { Provider } from '@nestjs/common';
import { IVariationTypeRepository } from 'src/domain/repository/variation-type-repository.interface';
import { VariationTypeRepository } from 'src/infrastructure/repository/variation-type.repository';
import { FindAllVariationTypesUseCase } from 'src/usecases/variation-type/find-all-variation-types.usecase';
import { Proxy } from '../../proxy';

const token = Symbol('__FIND_ALL_VARIATION_TYPES_USE_CASE__');
const provider: Provider = {
  inject: [VariationTypeRepository],
  provide: token,
  useFactory: (repository: IVariationTypeRepository) =>
    new FindAllVariationTypesUseCase(repository),
};

export const FindAllVariationTypesProxy = new Proxy(token, provider);
