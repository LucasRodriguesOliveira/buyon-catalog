import { CategoryModel } from 'src/domain/model/category.model';
import { ICategoryRepository } from 'src/domain/repository/category-repository.interface';

export class UpdateCategoryUseCase {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  public async run(
    categoryId: number,
    categoryToUpdate: Partial<CategoryModel>,
  ): Promise<CategoryModel> {
    return this.categoryRepository.update(categoryId, categoryToUpdate);
  }
}
