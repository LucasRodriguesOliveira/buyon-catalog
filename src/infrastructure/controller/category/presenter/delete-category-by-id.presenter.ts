import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { randomInt } from 'crypto';
import { CategoryModel } from 'src/domain/model/category.model';

@Exclude()
export class DeleteCategoryByIdPresenter extends CategoryModel {
  @ApiProperty({
    type: Number,
    example: randomInt(100),
  })
  @Expose()
  id: number;

  @ApiProperty({
    type: Date,
    example: new Date(),
  })
  @Expose()
  updatedAt: Date;
}
