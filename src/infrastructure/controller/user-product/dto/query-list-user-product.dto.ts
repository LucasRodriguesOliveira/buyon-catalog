import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';
import { randomInt, randomUUID } from 'crypto';

export class QueryListUserProductDto {
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  @IsUUID()
  @ApiProperty({
    type: String,
    example: randomUUID(),
    required: false,
  })
  userId?: string;

  @IsNotEmpty()
  @IsOptional()
  @IsNumberString()
  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 0,
  })
  @IsInt()
  @Min(1)
  @ApiProperty({
    type: Number,
    example: randomInt(100),
    required: false,
    minimum: 1,
  })
  productId?: number;
}
