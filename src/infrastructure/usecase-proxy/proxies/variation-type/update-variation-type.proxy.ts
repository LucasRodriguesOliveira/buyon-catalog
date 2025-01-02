import { Provider } from '@nestjs/common';
import { IVariationTypeRepository } from 'src/domain/repository/variation-type-repository.interface';
import { VariationTypeRepository } from 'src/infrastructure/repository/variation-type.repository';
import { UpdateVariationTypeUseCase } from 'src/usecases/variation-type/update-variation-type.usecase';
import { Proxy } from '../../proxy';

const token = Symbol('__UPDATE_VARIATION_TYPE_USE_CASE__');
const provider: Provider = {
  inject: [VariationTypeRepository],
  provide: token,
  useFactory: (repository: IVariationTypeRepository) =>
    new UpdateVariationTypeUseCase(repository),
};

export const UpdateVariationTypeProxy = new Proxy(token, provider);
