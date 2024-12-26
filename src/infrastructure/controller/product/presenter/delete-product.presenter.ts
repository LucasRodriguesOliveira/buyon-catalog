import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { randomInt } from 'crypto';
import { ProductModel } from 'src/domain/model/product.model';

@Exclude()
export class DeleteProductPresenter extends ProductModel {
  @Expose()
  @ApiProperty({
    type: Number,
    example: randomInt(100),
  })
  id: number;

  @Expose()
  @ApiProperty({
    type: Date,
    example: new Date(),
  })
  deletedAt: Date;
}
