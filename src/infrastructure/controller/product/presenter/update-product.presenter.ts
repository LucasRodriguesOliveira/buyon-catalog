import { Exclude, Expose } from 'class-transformer';
import { ProductModel } from 'src/domain/model/product.model';

@Exclude()
export class UpdateProductPresenter extends ProductModel {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  slug: string;

  @Expose()
  active: boolean;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
