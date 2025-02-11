import { ISKUVariationRepository } from 'src/domain/repository/sku-variation-repository.interface';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { SKUVariationModel } from 'src/domain/model/sku-variation.model';

@Injectable()
export class SKUVariationRepository implements ISKUVariationRepository {
  constructor(private readonly prisma: PrismaService) {}9

  insert(skuVariationData: SKUVariationModel): Promise<SKUVariationModel> {
    return this.prisma.skuVariation.create({
      data: skuVariationData,
    });
  }

  findAll(skuId: bigint): Promise<SKUVariationModel[]> {
    return this.prisma.skuVariation.findMany({
      where: {
        skuId,
      },
    });
  }

  delete(skuId: bigint, variationId: number): Promise<SKUVariationModel> {
    return this.prisma.skuVariation.delete({
      where: {
        variationId,
        skuId,
      },
    });
  }
}
