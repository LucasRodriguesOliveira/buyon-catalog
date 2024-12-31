import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { randomInt } from 'crypto';

export class CreateUserProductDto {
  @IsNotEmpty()
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
    required: true,
    minimum: 1,
  })
  productId: number;
}
