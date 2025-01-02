import { Provider } from '@nestjs/common';
import { IVariationTypeRepository } from 'src/domain/repository/variation-type-repository.interface';
import { VariationTypeRepository } from 'src/infrastructure/repository/variation-type.repository';
import { FindVariationTypeByIdUseCase } from 'src/usecases/variation-type/find-variation-type-by-id.usecase';
import { Proxy } from '../../proxy';

const token = Symbol('__FIND_VARIATION_TYPE_BY_ID_USE_CASE__');
const provider: Provider = {
  inject: [VariationTypeRepository],
  provide: token,
  useFactory: (repository: IVariationTypeRepository) =>
    new FindVariationTypeByIdUseCase(repository),
};

export const FindVariationTypeByIdProxy = new Proxy(token, provider);
