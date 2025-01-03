import { Provider } from '@nestjs/common';
import { IVariationRepository } from 'src/domain/repository/variation-repository.interface';
import { VariationRepository } from 'src/infrastructure/repository/variation.repository';
import { FindVariationByIdUseCase } from 'src/usecases/variation/find-variation-by-id.usecase';
import { Proxy } from '../../proxy';

const token = Symbol('__FIND_VARIATION_BY_ID_USE_CASE__');
const provider: Provider = {
  inject: [VariationRepository],
  provide: token,
  useFactory: (repository: IVariationRepository) =>
    new FindVariationByIdUseCase(repository),
};

export const FindVariationByIdProxy = new Proxy(token, provider);
