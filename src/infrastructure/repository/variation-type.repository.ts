import { IVariationTypeRepository } from 'src/domain/repository/variation-type-repository.interface';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { VariationType } from 'src/domain/model/variation-type.model';

@Injectable()
export class VariationTypeRepository implements IVariationTypeRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async insert(
    variationTypeData: VariationType,
  ): Promise<VariationType> {
    return this.prisma.productVariationType.create({
      data: variationTypeData,
    });
  }

  public async findAll(): Promise<VariationType[]> {
    return this.prisma.productVariationType.findMany({
      where: {
        deletedAt: null,
      },
    });
  }

  public async findById(variationTypeId: number): Promise<VariationType> {
    return this.prisma.productVariationType.findFirstOrThrow({
      where: {
        id: variationTypeId,
      },
    });
  }

  public async update(
    variationTypeId: number,
    variationTypeData: Partial<VariationType>,
  ): Promise<VariationType> {
    return this.prisma.productVariationType.update({
      where: {
        id: variationTypeId,
      },
      data: variationTypeData,
    });
  }

  public async deleteById(variationTypeId: number): Promise<VariationType> {
    return this.prisma.productVariationType.update({
      where: {
        id: variationTypeId,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
