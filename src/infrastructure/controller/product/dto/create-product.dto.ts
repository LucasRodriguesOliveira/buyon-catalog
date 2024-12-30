import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { CategoryModel } from 'src/domain/model/category.model';

class CreateProductDtoCategory extends CategoryModel {
  @IsNotEmpty()
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  @IsInt()
  @Min(0)
  @ApiProperty({
    type: Number,
    required: true,
    minimum: 0,
  })
  id: number;
}

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @ApiProperty({
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50,
    example: 'Some Product',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  @ApiProperty({
    type: String,
    required: true,
    minLength: 3,
    maxLength: 100,
    example: 'A short description explaining the product',
  })
  description: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
  @ApiProperty({
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50,
    example: 'some-product',
    pattern: '^[a-z0-9]+(?:-[a-z0-9]+)*',
  })
  slug: string;

  @IsDefined()
  @IsArray()
  @ApiProperty({
    type: [CreateProductDtoCategory],
    required: true,
    minLength: 0,
  })
  categories: CreateProductDtoCategory[];
}
