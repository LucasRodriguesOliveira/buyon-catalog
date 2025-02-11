import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { randomInt } from 'crypto';
import { VariationModel } from 'src/domain/model/variation.model';

@Exclude()
export class SKUVariationPresenter extends VariationModel {
  @Expose()
  @ApiProperty({
    type: Number,
    example: randomInt(100),
  })
  id: number;

  @Expose()
  @ApiProperty({
    type: String,
    example: 'Size',
  })
  description: string;

  @Expose()
  @ApiProperty({
    type: Boolean,
    example: true,
  })
  active: boolean;
}
