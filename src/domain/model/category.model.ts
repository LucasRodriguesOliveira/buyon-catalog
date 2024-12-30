export class CategoryModel {
  id: number;
  name: string;
  description: string;
  slug: string;
  parentCategoryId?: number;
  showPage: boolean;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
