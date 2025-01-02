import { Provider } from '@nestjs/common';
import { IVariationTypeRepository } from 'src/domain/repository/variation-type-repository.interface';
import { VariationTypeRepository } from 'src/infrastructure/repository/variation-type.repository';
import { DeleteVariationTypeByIdUseCase } from 'src/usecases/variation-type/delete-variation-type-by-id.usecase';
import { Proxy } from '../../proxy';

const token = Symbol('__DELETE_VARIATION_TYPE_BY_ID__');
const provider: Provider = {
  inject: [VariationTypeRepository],
  provide: token,
  useFactory: (repository: IVariationTypeRepository) =>
    new DeleteVariationTypeByIdUseCase(repository),
};

export const DeleteVariationTypeByIdProxy = new Proxy(token, provider);
