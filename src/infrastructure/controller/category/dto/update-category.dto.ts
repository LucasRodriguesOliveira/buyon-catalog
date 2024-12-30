import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { randomInt } from 'crypto';

export class UpdateCategoryDto {
  @ApiProperty({
    type: String,
    example: 'Jeans',
    required: false,
    minLength: 3,
    maxLength: 50,
  })
  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(50)
  name?: string;

  @ApiProperty({
    type: String,
    example: 'Jeans Pants',
    required: false,
    minLength: 0,
    maxLength: 100,
  })
  @IsString()
  @IsOptional()
  @MinLength(0)
  @MaxLength(100)
  description?: string;

  @ApiProperty({
    type: String,
    example: 'jeans-pants',
    required: false,
    minLength: 3,
    maxLength: 50,
  })
  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(50)
  slug?: string;

  @ApiProperty({
    type: Boolean,
    example: true,
    required: false,
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  showPage?: boolean;

  @ApiProperty({
    type: Number,
    example: randomInt(100),
    required: false,
    minimum: 1,
  })
  @IsOptional()
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  @IsInt()
  @Min(1)
  parentCategoryId?: number;
}
