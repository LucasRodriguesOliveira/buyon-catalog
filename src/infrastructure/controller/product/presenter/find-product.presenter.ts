import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { randomInt } from 'crypto';
import { CategoryModel } from 'src/domain/model/category.model';
import { ProductModel } from 'src/domain/model/product.model';

@Exclude()
class FindProductPresenterCategory extends CategoryModel {
  @Expose()
  @ApiProperty({
    type: Number,
    example: randomInt(100),
  })
  id: number;

  @Expose()
  @ApiProperty({
    type: String,
    example: 'Shoes',
  })
  name: string;
}

@Exclude()
export class FindProductPresenter extends ProductModel {
  @Expose()
  @ApiProperty({
    type: Number,
    example: randomInt(100),
  })
  id: number;

  @Expose()
  @ApiProperty({
    type: String,
    example: 'Some Product',
  })
  name: string;

  @Expose()
  @ApiProperty({
    type: String,
    example: 'A short description about the product',
  })
  description: string;

  @Expose()
  @ApiProperty({
    type: String,
    example: 'some-product',
  })
  slug: string;

  @Expose()
  @ApiProperty({
    type: Boolean,
    example: true,
  })
  active: boolean;

  @Expose()
  @ApiProperty({
    type: Date,
    example: new Date(),
  })
  createdAt: Date;

  @Expose()
  @ApiProperty({
    type: Date,
    example: new Date(),
  })
  updatedAt: Date;

  @Expose()
  @ApiProperty({
    type: [FindProductPresenterCategory],
  })
  categories: FindProductPresenterCategory[];
}
