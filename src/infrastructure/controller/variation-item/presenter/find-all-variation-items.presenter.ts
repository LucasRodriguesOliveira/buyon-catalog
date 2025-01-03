import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { randomInt } from 'crypto';
import { VariationItemModel } from 'src/domain/model/variation-item.model';

@Exclude()
export class FindAllVariationItemsPresenter extends VariationItemModel {
  @Expose()
  @ApiProperty({
    type: Number,
    example: randomInt(100),
  })
  id: number;

  @Expose()
  @ApiProperty({
    type: Boolean,
    example: true,
  })
  active: boolean;

  @Expose()
  @ApiProperty({
    type: String,
    example: 'Large',
  })
  description: string;

  @Expose()
  @ApiProperty({
    type: Number,
    example: randomInt(100),
  })
  variationId: number;
}
