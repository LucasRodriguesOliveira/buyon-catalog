import { ApiProperty } from '@nestjs/swagger';
import {
  Exclude,
  Expose,
  Transform,
  TransformFnParams,
} from 'class-transformer';
import { randomInt } from 'crypto';
import { SKUModel } from 'src/domain/model/sku.model';
import { SKUVariationPresenter } from './sku-variation.presenter';

@Exclude()
export class CreateSKUPresenter extends SKUModel {
  @Expose()
  @ApiProperty({
    type: BigInt,
    example: randomInt(1000),
  })
  @Transform(({ value }: TransformFnParams) =>
    parseInt((value as bigint).toString(), 10),
  )
  id: bigint;

  @Expose()
  @ApiProperty({
    type: String,
    example: 'Blue Sports Sneakers',
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
    type: BigInt,
    example: randomInt(1000),
  })
  @Transform(({ value }: TransformFnParams) =>
    parseInt((value as bigint).toString(), 10),
  )
  productId: bigint;

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

  @Expose()
  @ApiProperty({
    type: Date,
    example: new Date(),
  })
  createdAt: Date;

  @Expose()
  @ApiProperty({
    type: [SKUVariationPresenter],
    isArray: true,
  })
  variations: SKUVariationPresenter[];
}
