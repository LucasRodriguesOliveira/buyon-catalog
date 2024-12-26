export class ProductModel {
  id: number;
  name: string;
  description: string;
  slug: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
