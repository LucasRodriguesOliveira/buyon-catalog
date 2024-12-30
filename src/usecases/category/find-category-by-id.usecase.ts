import { CategoryModel } from 'src/domain/model/category.model';
import { ICategoryRepository } from 'src/domain/repository/category-repository.interface';

export class FindCategoryByIdUseCase {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  public async run(categoryId: number): Promise<CategoryModel | null> {
    return this.categoryRepository.findById(categoryId);
  }
}
