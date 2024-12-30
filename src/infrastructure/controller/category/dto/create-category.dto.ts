import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDefined,
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

export class CreateCategoryDto {
  @ApiProperty({
    type: String,
    example: 'Jeans',
    required: true,
    minLength: 3,
    maxLength: 50,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @ApiProperty({
    type: String,
    example: 'Jeans Pants',
    required: true,
    minLength: 0,
    maxLength: 100,
  })
  @IsString()
  @IsDefined()
  @MinLength(0)
  @MaxLength(100)
  description: string;

  @ApiProperty({
    type: String,
    example: 'jeans-pants',
    required: true,
    minLength: 3,
    maxLength: 50,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  slug: string;

  @ApiProperty({
    type: Boolean,
    example: true,
    required: true,
    default: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  showPage: boolean;

  @ApiProperty({
    type: Number,
    example: randomInt(100),
    required: true,
    minimum: 1,
  })
  @IsOptional()
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  @IsInt()
  @Min(1)
  parentCategoryId?: number;
}
