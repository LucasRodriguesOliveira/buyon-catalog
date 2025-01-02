import { VariationType } from '../model/variation-type.model';

export interface IVariationTypeRepository {
  insert(variationTypeData: Partial<VariationType>): Promise<VariationType>;
  findAll(): Promise<VariationType[]>;
  findById(variationTypeId: number): Promise<VariationType>;
  update(
    variationTypeId: number,
    variationTypeData: Partial<VariationType>,
  ): Promise<VariationType>;
  deleteById(variationTypeId: number): Promise<VariationType>;
}
