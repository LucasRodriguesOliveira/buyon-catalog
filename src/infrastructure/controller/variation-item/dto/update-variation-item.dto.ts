import { ApiProperty } from '@nestjs/swagger';
import { Transform, TransformFnParams } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateVariationItemDto {
  @ApiProperty({
    type: String,
    example: 'Pale Blue',
    required: false,
    minLength: 3,
    maxLength: 50,
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  @Transform(({ value }: TransformFnParams) => (value as string).trim())
  description?: string;

  @ApiProperty({
    type: Boolean,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  @IsNotEmpty()
  active?: boolean;
}
