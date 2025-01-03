import { Provider } from '@nestjs/common';
import { IVariationRepository } from 'src/domain/repository/variation-repository.interface';
import { VariationRepository } from 'src/infrastructure/repository/variation.repository';
import { CreateVariationUseCase } from 'src/usecases/variation/create-variation.usecase';
import { Proxy } from '../../proxy';

const token = Symbol('__CREATE_VARIATION_USE_CASE__');
const provider: Provider = {
  inject: [VariationRepository],
  provide: token,
  useFactory: (repository: IVariationRepository) =>
    new CreateVariationUseCase(repository),
};

export const CreateVariationProxy = new Proxy(token, provider);
