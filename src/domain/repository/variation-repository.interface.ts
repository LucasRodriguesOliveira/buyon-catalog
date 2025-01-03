import { VariationModel } from '../model/variation.model';

export interface IVariationRepository {
  insert(variationData: Partial<VariationModel>): Promise<VariationModel>;
  findAll(): Promise<VariationModel[]>;
  findById(variationId: number): Promise<VariationModel>;
  update(
    variationId: number,
    variationData: Partial<VariationModel>,
  ): Promise<VariationModel>;
  deleteById(variationId: number): Promise<VariationModel>;
}
