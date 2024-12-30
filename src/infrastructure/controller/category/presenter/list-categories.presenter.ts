import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { randomInt } from 'crypto';
import { CategoryModel } from 'src/domain/model/category.model';

@Exclude()
export class ListCategoriesPresenter extends CategoryModel {
  @ApiProperty({
    type: Number,
    example: randomInt(100),
  })
  @Expose()
  id: number;

  @ApiProperty({
    type: String,
    example: 'Male Shoes',
  })
  @Expose()
  name: string;

  @ApiProperty({
    type: String,
    example: 'Male Shoes of all sizes',
  })
  @Expose()
  description: string;

  @ApiProperty({
    type: Boolean,
    example: true,
  })
  @Expose()
  active: boolean;

  @ApiProperty({
    type: String,
    example: 'male-shoes',
  })
  @Expose()
  slug: string;

  @ApiProperty({
    type: Boolean,
    example: true,
  })
  @Expose()
  showPage: boolean;
}
