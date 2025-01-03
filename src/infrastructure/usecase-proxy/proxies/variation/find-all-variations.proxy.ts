import { Provider } from '@nestjs/common';
import { IVariationRepository } from 'src/domain/repository/variation-repository.interface';
import { VariationRepository } from 'src/infrastructure/repository/variation.repository';
import { FindAllVariationsUseCase } from 'src/usecases/variation/find-all-variations.usecase';
import { Proxy } from '../../proxy';

const token = Symbol('__FIND_ALL_VARIATION_S_USE_CASE__');
const provider: Provider = {
  inject: [VariationRepository],
  provide: token,
  useFactory: (repository: IVariationRepository) =>
    new FindAllVariationsUseCase(repository),
};

export const FindAllVariationsProxy = new Proxy(token, provider);
