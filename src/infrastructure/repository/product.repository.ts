import { Injectable } from '@nestjs/common';
import { IProductRepository } from 'src/domain/repository/product-repository.interface';
import { PrismaService } from '../prisma/prisma.service';
import { ProductModel } from 'src/domain/model/product.model';
import { Product } from '@prisma/client';

@Injectable()
export class ProductRepository implements IProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async insert(product: Product): Promise<ProductModel> {
    return this.prisma.product.create({
      data: product,
    });
  }

  public async findAll(): Promise<ProductModel[]> {
    return this.prisma.product.findMany({
      where: {
        deletedAt: null,
      },
    });
  }

  public async findById(productId: number): Promise<ProductModel> {
    return this.prisma.product.findUniqueOrThrow({
      where: {
        id: productId,
      },
    });
  }

  public async update(
    productId: number,
    productToUpdate: Product,
  ): Promise<ProductModel> {
    return this.prisma.product.update({
      data: productToUpdate,
      where: {
        id: productId,
      },
    });
  }

  public async deleteById(productId: number): Promise<ProductModel> {
    return this.prisma.product.update({
      data: {
        deletedAt: new Date(),
      },
      where: {
        id: productId,
      },
    });
  }
}
