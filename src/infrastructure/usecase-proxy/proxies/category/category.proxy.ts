import { Provider } from '@nestjs/common';
import { CreateCategoryProxy } from './create-category.proxy';
import { ListCategoriesProxy } from './list-categories.proxy';
import { FindCategoryByIdProxy } from './find-category-by-id.proxy';
import { UpdateCategoryProxy } from './update-category.proxy';
import { DeleteCategoryByIdProxy } from './delete-category-by-id.proxy';

export const CategoryProxy: Map<symbol, Provider> = new Map([
  CreateCategoryProxy.Entry,
  ListCategoriesProxy.Entry,
  FindCategoryByIdProxy.Entry,
  UpdateCategoryProxy.Entry,
  DeleteCategoryByIdProxy.Entry,
]);
