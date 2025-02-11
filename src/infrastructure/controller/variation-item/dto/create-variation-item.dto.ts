import { ApiProperty } from '@nestjs/swagger';
import { Transform, TransformFnParams } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { randomInt } from 'crypto';

export class CreateVariationItemDto {
  @ApiProperty({
    type: String,
    example: 'Short',
    required: true,
    minLength: 1,
    maxLength: 50,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(50)
  @Transform(({ value }: TransformFnParams) => (value as string).trim())
  description: string;

  @ApiProperty({
    type: Number,
    example: randomInt(100),
    required: true,
  })
  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 0,
  })
  @IsNotEmpty()
  @Min(1)
  @IsInt()
  variationId: number;
}
