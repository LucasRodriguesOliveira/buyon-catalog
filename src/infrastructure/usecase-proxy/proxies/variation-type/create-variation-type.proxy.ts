import { Provider } from '@nestjs/common';
import { IVariationTypeRepository } from 'src/domain/repository/variation-type-repository.interface';
import { VariationTypeRepository } from 'src/infrastructure/repository/variation-type.repository';
import { CreateVariationTypeUseCase } from 'src/usecases/variation-type/create-variation-type.usecase';
import { Proxy } from '../../proxy';

const token = Symbol('__CREATE_VARIATION_TYPE_USE_CASE__');
const provider: Provider = {
  inject: [VariationTypeRepository],
  provide: token,
  useFactory: (repository: IVariationTypeRepository) =>
    new CreateVariationTypeUseCase(repository),
};

export const CreateVariationTypeProxy = new Proxy(token, provider);
