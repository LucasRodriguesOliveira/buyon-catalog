import { CategoryModel } from 'src/domain/model/category.model';
import { ICategoryRepository } from 'src/domain/repository/category-repository.interface';

export class CreateCategoryUseCase {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  public async run(category: Partial<CategoryModel>): Promise<CategoryModel> {
    return this.categoryRepository.insert(category);
  }
}
