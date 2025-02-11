import { VariationModel } from './variation.model';

export class SKUModel {
  id: bigint;
  name: string;
  productId: bigint;
  price: number;
  quantity: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  variations: VariationModel[];
}
