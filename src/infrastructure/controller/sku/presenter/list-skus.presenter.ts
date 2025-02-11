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
export class ListSKUsPresenter extends SKUModel {
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
    type: String,
    example: 'Red Velvet Leather Jacket',
  })
  name: string;

  @Expose()
  @ApiProperty({
    type: Number,
    example: randomInt(100),
  })
  price: number;

  @Expose()
  @ApiProperty({
    type: Number,
    example: randomInt(100),
  })
  quantity: number;

  @Expose()
  @ApiProperty({
    type: Boolean,
    example: true,
  })
  active: boolean;
}
