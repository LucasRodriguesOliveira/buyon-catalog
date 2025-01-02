import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { randomInt } from 'crypto';
import { VariationType } from 'src/domain/model/variation-type.model';

@Exclude()
export class DeleteVariationTypeByIdPresenter extends VariationType {
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
