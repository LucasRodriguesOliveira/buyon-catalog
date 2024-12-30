import { CategoryModel } from '../model/category.model';

export interface ICategoryRepository {
  insert(category: Partial<CategoryModel>): Promise<CategoryModel>;
  findById(categoryId: number): Promise<CategoryModel | null>;
  findAll(categoryIds: number[]): Promise<CategoryModel[]>;
  update(
    categoryId: number,
    categoryToUpdate: Partial<CategoryModel>,
  ): Promise<CategoryModel>;
  deleteById(categoryId: number): Promise<CategoryModel>;
}
