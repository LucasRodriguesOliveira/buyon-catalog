import { Provider } from '@nestjs/common';
import { CategoryRepository } from 'src/infrastructure/repository/category.repository';
import { CreateCategoryUseCase } from 'src/usecases/category/create-category.usecase';
import { Proxy } from '../../proxy';

const token = Symbol('__CREATE_CATEGORY_USE_CASE__');
const provider: Provider = {
  inject: [CategoryRepository],
  provide: token,
  useFactory: (repository: CategoryRepository) =>
    new CreateCategoryUseCase(repository),
};

export const CreateCategoryProxy = new Proxy(token, provider);
