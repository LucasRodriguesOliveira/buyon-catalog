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
export class FindSKUByIdPresenter extends SKUModel {
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
    example: 'Wonderful Player White Large Socks',
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
    type: Number,
    example: randomInt(1000),
  })
  @Transform(({ value }: TransformFnParams) =>
    parseInt((value as bigint).toString(), 10),
  )
  productId: bigint;

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

  @Expose()
  @ApiProperty({
    type: [SKUVariationPresenter],
    isArray: true,
  })
  variations: SKUVariationPresenter[];
}
