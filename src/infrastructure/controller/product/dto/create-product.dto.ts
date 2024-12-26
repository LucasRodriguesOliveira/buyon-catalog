import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

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
}
