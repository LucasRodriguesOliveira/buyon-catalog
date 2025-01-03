import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { randomInt } from 'crypto';
import { VariationItemModel } from 'src/domain/model/variation-item.model';

@Exclude()
export class DeleteVariationItemPresenter extends VariationItemModel {
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
