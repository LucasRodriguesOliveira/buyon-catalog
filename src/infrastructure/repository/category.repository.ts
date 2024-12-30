import { ICategoryRepository } from 'src/domain/repository/category-repository.interface';
import { PrismaService } from '../prisma/prisma.service';
import { CategoryModel } from 'src/domain/model/category.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryRepository implements ICategoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async insert(category: CategoryModel): Promise<CategoryModel> {
    return this.prisma.category.create({
      data: category,
    });
  }

  public async findAll(categoryIds: number[]): Promise<CategoryModel[]> {
    if (categoryIds.length === 0) {
      return this.prisma.category.findMany({
        where: {
          deletedAt: null,
        },
      });
    }

    return this.prisma.category.findMany({
      where: {
        deletedAt: null,
        id: {
          in: categoryIds,
        },
      },
    });
  }

  public async findById(categoryId: number): Promise<CategoryModel | null> {
    return this.prisma.category.findUniqueOrThrow({
      where: {
        id: categoryId,
      },
    });
  }

  public async update(
    categoryId: number,
    categoryToUpdate: Partial<CategoryModel>,
  ): Promise<CategoryModel> {
    return this.prisma.category.update({
      where: {
        id: categoryId,
      },
      data: categoryToUpdate,
    });
  }

  public async deleteById(categoryId: number): Promise<CategoryModel> {
    return this.prisma.category.update({
      where: {
        id: categoryId,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
