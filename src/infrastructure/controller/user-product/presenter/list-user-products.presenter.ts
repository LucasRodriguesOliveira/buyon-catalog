import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';
import { randomInt, randomUUID } from 'crypto';
import { ProductModel } from 'src/domain/model/product.model';
import { UserProductModel } from 'src/domain/model/user-product.model';
import { UserModel } from 'src/domain/model/user.model';

@Exclude()
class ListUserProductsPresenterUser extends UserModel {
  @Expose()
  @ApiProperty({
    type: String,
    example: randomUUID(),
  })
  id: string;

  @Expose()
  @ApiProperty({
    type: String,
    example: 'John',
  })
  firstname: string;
}

@Exclude()
class ListUserProductsPresenterProduct extends ProductModel {
  @Expose()
  @ApiProperty({
    type: Number,
    example: randomInt(100),
  })
  id: number;

  @Expose()
  @ApiProperty({
    type: String,
    example: 'Sneakers',
  })
  name: string;
}

@Exclude()
export class ListUserProductsPresenter extends UserProductModel {
  @Expose()
  @ApiProperty({
    type: BigInt,
    example: randomInt(1000),
  })
  @Transform(({ value }) => parseInt(value.toString(), 10) ?? value.toString())
  id: bigint;

  @Expose()
  @ApiProperty({
    type: Boolean,
    example: true,
  })
  active: boolean;

  @Expose()
  @ApiProperty({
    type: ListUserProductsPresenterUser,
  })
  user: ListUserProductsPresenterUser;

  @Expose()
  @ApiProperty({
    type: ListUserProductsPresenterProduct,
  })
  product: ListUserProductsPresenterProduct;
}
