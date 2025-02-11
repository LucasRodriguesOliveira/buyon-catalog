import { Injectable } from '@nestjs/common';
import { SKUModel } from 'src/domain/model/sku.model';
import { ISKURepository } from 'src/domain/repository/sku-repository.interface';
import { PrismaService } from '../prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { VariationModel } from 'src/domain/model/variation.model';

@Injectable()
export class SKURepository implements ISKURepository {
  constructor(private readonly prisma: PrismaService) {}

  public async insert(skuData: SKUModel): Promise<SKUModel> {
    const createdSKU = await this.prisma.sku.create({
      data: skuData,
    });

    return {
      ...createdSKU,
      price: createdSKU.price.toNumber(),
      variations: [],
    };
  }

  public async findAll(): Promise<SKUModel[]> {
    const skus = await this.prisma.sku.findMany({
      where: {
        deletedAt: null,
      },
    });

    return skus.map((sku) => ({
      ...sku,
      price: sku.price.toNumber(),
      variations: [],
    }));
  }

  public async findById(skuId: bigint): Promise<SKUModel> {
    const sku = await this.prisma.sku.findFirstOrThrow({
      where: {
        id: skuId,
      },
      include: {
        skuVariations: {
          select: {
            variation: {
              select: {
                id: true,
                description: true,
                active: true,
              },
            },
          },
        },
      },
    });

    return {
      ...sku,
      price: sku.price.toNumber(),
      variations: plainToInstance(
        VariationModel,
        sku.skuVariations.map((skuVariation) => skuVariation.variation),
      ),
    };
  }

  public async update(
    skuId: bigint,
    skuData: Partial<SKUModel>,
  ): Promise<SKUModel> {
    const updatedSKU = await this.prisma.sku.update({
      where: {
        id: skuId,
      },
      data: skuData,
      include: {
        skuVariations: {
          select: {
            variation: {
              select: {
                id: true,
                description: true,
                active: true,
              },
            },
          },
        },
      },
    });

    return {
      ...updatedSKU,
      price: updatedSKU.price.toNumber(),
      variations: plainToInstance(
        VariationModel,
        updatedSKU.skuVariations.map((skuVariation) => skuVariation.variation),
      ),
    };
  }

  public async deleteById(skuId: bigint): Promise<SKUModel> {
    const deletedSKU = await this.prisma.sku.update({
      where: {
        id: skuId,
      },
      data: {
        deletedAt: new Date(),
      },
      include: {
        skuVariations: {
          select: {
            variation: {
              select: {
                id: true,
                description: true,
                active: true,
              },
            },
          },
        },
      },
    });

    return {
      ...deletedSKU,
      price: deletedSKU.price.toNumber(),
      variations: plainToInstance(
        VariationModel,
        deletedSKU.skuVariations.map((skuVariation) => skuVariation.variation),
      ),
    };
  }
}
