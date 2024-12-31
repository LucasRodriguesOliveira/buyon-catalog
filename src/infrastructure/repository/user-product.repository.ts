import { UserProductModel } from 'src/domain/model/user-product.model';
import { IUserProductRepository } from 'src/domain/repository/user-product-repository.interface';
import { PrismaService } from '../prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ProductModel } from 'src/domain/model/product.model';
import { CategoryModel } from 'src/domain/model/category.model';
import { Prisma } from '@prisma/client';
import { UserModel } from 'src/domain/model/user.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserProductRepository implements IUserProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async insert(
    userId: string,
    productId: number,
  ): Promise<UserProductModel> {
    const result = await this.prisma.userProduct.create({
      data: {
        userId,
        productId,
      },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            active: true,
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
        },
        user: {
          select: {
            id: true,
            firstname: true,
          },
        },
      },
    });

    return plainToInstance(UserProductModel, {
      ...result,
      product: plainToInstance(ProductModel, {
        ...result.product,
        categories: plainToInstance(
          CategoryModel,
          result.product.categories.map(
            (productCategory) => productCategory.category,
          ),
        ),
      }),
    });
  }

  public async findAll(
    userId?: string,
    productId?: number,
  ): Promise<UserProductModel[]> {
    const result = await this.prisma.userProduct.findMany({
      where: {
        deletedAt: null,
        userId: userId ?? Prisma.skip,
        productId: productId ?? Prisma.skip,
      },
      select: {
        id: true,
        user: {
          select: {
            id: true,
            firstname: true,
          },
        },
        product: {
          select: {
            id: true,
            name: true,
          },
        },
        active: true,
      },
    });

    return plainToInstance(UserProductModel, result);
  }

  public async findById(userProductId: bigint): Promise<UserProductModel> {
    const result = await this.prisma.userProduct.findFirstOrThrow({
      where: {
        id: userProductId,
      },
      include: {
        user: {
          select: {
            id: true,
            firstname: true,
          },
        },
        product: {
          select: {
            id: true,
            name: true,
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
        },
      },
    });

    return plainToInstance(UserProductModel, {
      ...result,
      user: plainToInstance(UserModel, result.user),
      product: {
        ...result.product,
        categories: result.product.categories.map((productCategory) =>
          plainToInstance(CategoryModel, productCategory.category),
        ),
      },
    });
  }

  public async update(
    userProductId: bigint,
    active: boolean,
  ): Promise<UserProductModel> {
    const result = await this.prisma.userProduct.update({
      where: {
        id: userProductId,
      },
      data: {
        active,
      },
      include: {
        user: {
          select: {
            id: true,
            firstname: true,
          },
        },
        product: {
          select: {
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
        },
      },
    });

    return plainToInstance(UserProductModel, {
      ...result,
      user: plainToInstance(UserModel, result.user),
      product: {
        ...result.product,
        categories: result.product.categories.map((productCategory) =>
          plainToInstance(CategoryModel, productCategory.category),
        ),
      },
    });
  }

  public async deleteById(userProductId: bigint): Promise<UserProductModel> {
    const result = await this.prisma.userProduct.update({
      where: {
        id: userProductId,
      },
      data: {
        deletedAt: new Date(),
      },
      select: {
        id: true,
        deletedAt: true,
      },
    });

    return plainToInstance(UserProductModel, result);
  }
}
