import { ApiProperty } from '@nestjs/swagger';
import {
  Exclude,
  Expose,
  Transform,
  TransformFnParams,
} from 'class-transformer';
import { randomInt } from 'crypto';
import { SKUVariationModel } from 'src/domain/model/sku-variation.model';

@Exclude()
export class DeleteSKUVariationPresenter extends SKUVariationModel {
  @Expose()
  @ApiProperty({
    type: BigInt,
    example: randomInt(1000),
  })
  @Transform(({ value }: TransformFnParams) =>
    parseInt((value as bigint).toString(), 10),
  )
  id: bigint;
}
