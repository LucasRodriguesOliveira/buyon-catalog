import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { randomInt } from 'crypto';
import { CategoryModel } from 'src/domain/model/category.model';

@Exclude()
export class CreateCategoryPresenter extends CategoryModel {
  @ApiProperty({
    type: Number,
    example: randomInt(100),
  })
  @Expose()
  id: number;

  @ApiProperty({
    type: String,
    example: 'Male T-Shirt',
  })
  @Expose()
  name: string;

  @ApiProperty({
    type: String,
    example: 'Male T-Shirts of all sizes and colors',
  })
  @Expose()
  description: string;

  @ApiProperty({
    type: String,
    example: 'male-t-shirt',
  })
  @Expose()
  slug: string;

  @ApiProperty({
    type: Boolean,
    example: true,
  })
  @Expose()
  showPage: boolean;

  @ApiProperty({
    type: Boolean,
    example: true,
  })
  @Expose()
  active: boolean;

  @ApiProperty({
    type: Number,
    example: randomInt(100),
  })
  @Expose()
  parentCategoryId?: number;

  @ApiProperty({
    type: Date,
    example: new Date(),
  })
  @Expose()
  createdAt: Date;
}
