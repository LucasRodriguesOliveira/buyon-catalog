import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateVariationTypeDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  @ApiProperty({
    type: String,
    example: 'Clothe Size',
    minLength: 3,
    maxLength: 50,
    required: true,
  })
  @Transform(({ value }) => value.trim())
  description: string;
}
