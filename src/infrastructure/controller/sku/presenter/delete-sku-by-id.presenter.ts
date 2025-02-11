import { ApiProperty } from '@nestjs/swagger';
import {
  Exclude,
  Expose,
  Transform,
  TransformFnParams,
} from 'class-transformer';
import { randomInt } from 'crypto';
import { SKUModel } from 'src/domain/model/sku.model';

@Exclude()
export class DeleteSkuByIdPresenter extends SKUModel {
  @Expose()
  @ApiProperty({
    type: Number,
    example: randomInt(1000),
  })
  @Transform(({ value }: TransformFnParams) =>
    parseInt((value as bigint).toString(), 10),
  )
  id: bigint;

  @Expose()
  @ApiProperty({
    type: Date,
    example: new Date(),
  })
  deletedAt: Date;
}
