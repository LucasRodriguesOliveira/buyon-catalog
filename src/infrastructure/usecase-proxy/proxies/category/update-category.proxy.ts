import { Provider } from '@nestjs/common';
import { ICategoryRepository } from 'src/domain/repository/category-repository.interface';
import { CategoryRepository } from 'src/infrastructure/repository/category.repository';
import { UpdateCategoryUseCase } from 'src/usecases/category/update-category.usecase';
import { Proxy } from '../../proxy';

const token = Symbol('__UPDATE_CATEGORY_USE_CASE__');
const provider: Provider = {
  inject: [CategoryRepository],
  provide: token,
  useFactory: (repository: ICategoryRepository) =>
    new UpdateCategoryUseCase(repository),
};

export const UpdateCategoryProxy = new Proxy(token, provider);
