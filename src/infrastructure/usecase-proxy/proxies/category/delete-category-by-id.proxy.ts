import { Provider } from '@nestjs/common';
import { ICategoryRepository } from 'src/domain/repository/category-repository.interface';
import { CategoryRepository } from 'src/infrastructure/repository/category.repository';
import { DeleteCategoryByIdUseCase } from 'src/usecases/category/delete-category-by-id.usecase';
import { Proxy } from '../../proxy';

const token = Symbol('__DELETE_CATEGORY_BY_ID_USE_CASE__');
const provider: Provider = {
  inject: [CategoryRepository],
  provide: token,
  useFactory: (repository: ICategoryRepository) =>
    new DeleteCategoryByIdUseCase(repository),
};

export const DeleteCategoryByIdProxy = new Proxy(token, provider);
