import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';
import { randomInt } from 'crypto';
import { UserProductModel } from 'src/domain/model/user-product.model';

@Exclude()
export class DeleteUserProductByIdPresenter extends UserProductModel {
  @Expose()
  @ApiProperty({
    type: BigInt,
    example: randomInt(1000),
  })
  @Transform(({ value }) => parseInt(value.toString(), 10) ?? value.toString())
  id: bigint;

  @Expose()
  @ApiProperty({
    type: Date,
    example: new Date(),
  })
  deletedAt: Date;
}
