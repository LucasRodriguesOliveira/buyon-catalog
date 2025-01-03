import { IVariationRepository } from 'src/domain/repository/variation-repository.interface';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { VariationModel } from 'src/domain/model/variation.model';

@Injectable()
export class VariationRepository implements IVariationRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async insert(variationData: VariationModel): Promise<VariationModel> {
    return this.prisma.variation.create({
      data: variationData,
    });
  }

  public async findAll(): Promise<VariationModel[]> {
    return this.prisma.variation.findMany({
      where: {
        deletedAt: null,
      },
    });
  }

  public async findById(variationId: number): Promise<VariationModel> {
    return this.prisma.variation.findFirstOrThrow({
      where: {
        id: variationId,
      },
    });
  }

  public async update(
    variationId: number,
    variationData: Partial<VariationModel>,
  ): Promise<VariationModel> {
    return this.prisma.variation.update({
      where: {
        id: variationId,
      },
      data: variationData,
    });
  }

  public async deleteById(variationId: number): Promise<VariationModel> {
    return this.prisma.variation.update({
      where: {
        id: variationId,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
