import { VariationItemModel } from 'src/domain/model/variation-item.model';
import { IVariationItemRepository } from 'src/domain/repository/variation-item-repository.interface';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class VariationItemRepository implements IVariationItemRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async insert(
    variationItemData: VariationItemModel,
  ): Promise<VariationItemModel> {
    return this.prisma.variationItem.create({
      data: variationItemData,
    });
  }

  public async findAll(variationId: number): Promise<VariationItemModel[]> {
    return this.prisma.variationItem.findMany({
      where: {
        deletedAt: null,
        variationId,
      },
    });
  }

  public async update(
    variationItemId: number,
    variationItemData: Partial<VariationItemModel>,
  ): Promise<VariationItemModel> {
    return this.prisma.variationItem.update({
      where: {
        id: variationItemId,
      },
      data: variationItemData,
    });
  }

  public async deleteById(
    variationItemId: number,
  ): Promise<VariationItemModel> {
    return this.prisma.variationItem.update({
      where: {
        id: variationItemId,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
