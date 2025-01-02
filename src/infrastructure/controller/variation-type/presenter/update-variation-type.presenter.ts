import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { randomInt } from 'crypto';
import { VariationType } from 'src/domain/model/variation-type.model';

@Exclude()
export class UpdateVariationTypePresenter extends VariationType {
  @Expose()
  @ApiProperty({
    type: Number,
    example: randomInt(100),
  })
  id: number;

  @Expose()
  @ApiProperty({
    type: String,
    example: 'Color',
  })
  description: string;

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
}
