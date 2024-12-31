import { Injectable } from '@nestjs/common';
import { IProductRepository } from 'src/domain/repository/product-repository.interface';
import { PrismaService } from '../prisma/prisma.service';
import { ProductModel } from 'src/domain/model/product.model';
import { Product } from '@prisma/client';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ProductRepository implements IProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async insert(product: Product): Promise<ProductModel> {
    const result = await this.prisma.product.create({
      data: product,
      include: {
        categories: {
          select: {
            category: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    return plainToInstance(ProductModel, {
      ...result,
      categories: result.categories.map(
        (productCategory) => productCategory.category,
      ),
    });
  }

  public async findAll(): Promise<ProductModel[]> {
    const result = await this.prisma.product.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        categories: {
          select: {
            category: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    return plainToInstance(
      ProductModel,
      result.map((product) => ({
        ...product,
        categories: product.categories.map(
          (productCategory) => productCategory.category,
        ),
      })),
    );
  }

  public async findById(productId: number): Promise<ProductModel> {
    const result = await this.prisma.product.findUniqueOrThrow({
      where: {
        id: productId,
      },
      include: {
        categories: {
          select: {
            category: {
              select: {
                id: true,
                name: true,
                description: true,
              },
            },
          },
        },
      },
    });

    return plainToInstance(ProductModel, {
      ...result,
      categories: result.categories.map(
        (productCategory) => productCategory.category,
      ),
    });
  }

  public async update(
    productId: number,
    productToUpdate: Product,
  ): Promise<ProductModel> {
    const result = await this.prisma.product.update({
      data: productToUpdate,
      where: {
        id: productId,
      },
      include: {
        categories: {
          select: {
            category: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    return plainToInstance(ProductModel, {
      ...result,
      categories: result.categories.map(
        (productCategory) => productCategory.category,
      ),
    });
  }

  public async deleteById(productId: number): Promise<ProductModel> {
    const result = await this.prisma.product.update({
      data: {
        deletedAt: new Date(),
      },
      where: {
        id: productId,
      },
      select: {
        id: true,
        deletedAt: true,
      },
    });

    return plainToInstance(ProductModel, {
      ...result,
      categories: [],
    });
  }

  public async attachCategory(
    productId: number,
    categoryId: number,
  ): Promise<ProductModel> {
    return this.prisma.$transaction(async (t) => {
      const productCategory = await t.productCategory.findFirst({
        where: {
          productId,
          categoryId,
        },
      });

      let product = await t.product.findUniqueOrThrow({
        where: {
          id: productId,
        },
        include: {
          categories: {
            select: {
              category: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      });

      if (productCategory) {
        return plainToInstance(ProductModel, {
          ...product,
          categories: product.categories.map(
            (productCategory) => productCategory.category,
          ),
        });
      }

      const category = await t.category.findUniqueOrThrow({
        where: {
          id: categoryId,
        },
      });

      await t.productCategory.create({
        data: {
          productId: product.id,
          categoryId: category.id,
        },
      });

      product = await t.product.findFirstOrThrow({
        where: {
          id: product.id,
        },
        include: {
          categories: {
            select: {
              category: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      });

      return plainToInstance(ProductModel, {
        ...product,
        categories: product.categories.map(
          (productCategory) => productCategory.category,
        ),
      });
    });
  }

  public async deattachCategory(
    productId: number,
    categoryId: number,
  ): Promise<ProductModel> {
    const [product, category] = await Promise.all([
      this.prisma.product.findUniqueOrThrow({
        where: {
          id: productId,
        },
      }),
      this.prisma.category.findUniqueOrThrow({
        where: {
          id: categoryId,
        },
      }),
    ]);

    const productCategory = await this.prisma.productCategory.findFirstOrThrow({
      where: {
        productId: product.id,
        categoryId: category.id,
      },
    });

    await this.prisma.productCategory.delete({
      where: {
        id: productCategory.id,
      },
    });

    const productUpdated = await this.prisma.product.findUniqueOrThrow({
      where: {
        id: productId,
      },
      include: {
        categories: {
          select: {
            category: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    return plainToInstance(ProductModel, {
      ...productUpdated,
      categories: productUpdated.categories.map(
        (productCategory) => productCategory.category,
      ),
    });
  }
}
