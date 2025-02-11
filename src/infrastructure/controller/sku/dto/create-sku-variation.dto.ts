import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { randomInt } from 'crypto';

export class CreateSKUVariationDto {
  @ApiProperty({
    type: Number,
    example: randomInt(100),
    required: true,
    minimum: 0,
    isArray: false,
    nullable: false,
  })
  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 0,
  })
  @IsInt()
  @Min(0)
  @IsNotEmpty()
  variationId: number;
}
