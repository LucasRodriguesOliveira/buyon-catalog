import { CategoryModel } from 'src/domain/model/category.model';
import { ICategoryRepository } from 'src/domain/repository/category-repository.interface';

export class ListCategoriesUseCase {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  public async run(categoryIds: number[]): Promise<CategoryModel[]> {
    return this.categoryRepository.findAll(categoryIds);
  }
}
