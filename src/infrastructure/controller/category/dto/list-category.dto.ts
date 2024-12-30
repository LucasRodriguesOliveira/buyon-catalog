import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class ListCategoryDto {
  @IsOptional()
  @ApiProperty({
    type: [Number],
    required: false,
    isArray: true,
    default: [],
  })
  @Transform(Number)
  categories?: number[];
}
