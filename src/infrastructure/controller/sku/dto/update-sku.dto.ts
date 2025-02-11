import { ApiProperty } from '@nestjs/swagger';
import { Transform, TransformFnParams } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { randomInt } from 'crypto';

export class UpdateSkuDto {
  @ApiProperty({
    type: String,
    example: 'IPear 25 Pro Min 1Tb Rom',
    required: false,
    minLength: 3,
    maxLength: 50,
    nullable: false,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @Transform(({ value }: TransformFnParams) => (value as string).trim())
  name?: string;

  @ApiProperty({
    type: Number,
    example: randomInt(1000),
    required: false,
    minimum: 1,
    nullable: false,
  })
  @Transform(({ value }: TransformFnParams) => BigInt(value))
  @IsOptional()
  @IsNotEmpty()
  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 0,
  })
  @Min(1)
  productId?: bigint;

  @ApiProperty({
    type: Number,
    example: randomInt(100),
    required: false,
    minimum: 0.01,
    nullable: false,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 4,
  })
  @Min(0.01)
  price?: number;

  @ApiProperty({
    type: Number,
    example: randomInt(100),
    required: false,
    nullable: false,
    minimum: 0,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 0,
  })
  @IsInt()
  @Min(0)
  quantity?: number;
}
