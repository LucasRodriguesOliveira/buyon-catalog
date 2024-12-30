import { Provider } from '@nestjs/common';
import { ICategoryRepository } from 'src/domain/repository/category-repository.interface';
import { CategoryRepository } from 'src/infrastructure/repository/category.repository';
import { ListCategoriesUseCase } from 'src/usecases/category/list-categories.usecase';
import { Proxy } from '../../proxy';

const token = Symbol('__LIST_CATEGORIES_USE_CASE__');
const provider: Provider = {
  inject: [CategoryRepository],
  provide: token,
  useFactory: (repository: ICategoryRepository) =>
    new ListCategoriesUseCase(repository),
};

export const ListCategoriesProxy = new Proxy(token, provider);
