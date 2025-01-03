import { Provider } from '@nestjs/common';
import { IVariationRepository } from 'src/domain/repository/variation-repository.interface';
import { VariationRepository } from 'src/infrastructure/repository/variation.repository';
import { DeleteVariationByIdUseCase } from 'src/usecases/variation/delete-variation-by-id.usecase';
import { Proxy } from '../../proxy';

const token = Symbol('__DELETE_VARIATION_BY_ID__');
const provider: Provider = {
  inject: [VariationRepository],
  provide: token,
  useFactory: (repository: IVariationRepository) =>
    new DeleteVariationByIdUseCase(repository),
};

export const DeleteVariationByIdProxy = new Proxy(token, provider);
