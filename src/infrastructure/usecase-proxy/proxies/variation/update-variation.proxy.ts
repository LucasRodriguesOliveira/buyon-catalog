import { Provider } from '@nestjs/common';
import { IVariationRepository } from 'src/domain/repository/variation-repository.interface';
import { VariationRepository } from 'src/infrastructure/repository/variation.repository';
import { UpdateVariationUseCase } from 'src/usecases/variation/update-variation.usecase';
import { Proxy } from '../../proxy';

const token = Symbol('__UPDATE_VARIATION__USE_CASE__');
const provider: Provider = {
  inject: [VariationRepository],
  provide: token,
  useFactory: (repository: IVariationRepository) =>
    new UpdateVariationUseCase(repository),
};

export const UpdateVariationProxy = new Proxy(token, provider);
