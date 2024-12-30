import { Provider } from '@nestjs/common';
import { ICategoryRepository } from 'src/domain/repository/category-repository.interface';
import { CategoryRepository } from 'src/infrastructure/repository/category.repository';
import { FindCategoryByIdUseCase } from 'src/usecases/category/find-category-by-id.usecase';
import { Proxy } from '../../proxy';

const token = Symbol('__FIND_CATEGORY_BY_ID_USE_CASE__');
const provider: Provider = {
  inject: [CategoryRepository],
  provide: token,
  useFactory: (repository: ICategoryRepository) =>
    new FindCategoryByIdUseCase(repository),
};

export const FindCategoryByIdProxy = new Proxy(token, provider);
