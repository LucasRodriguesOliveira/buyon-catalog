import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';
import { randomInt, randomUUID } from 'crypto';
import { CategoryModel } from 'src/domain/model/category.model';
import { ProductModel } from 'src/domain/model/product.model';
import { UserProductModel } from 'src/domain/model/user-product.model';
import { UserModel } from 'src/domain/model/user.model';

@Exclude()
class UpdateUserProductPresenterProductCategories extends CategoryModel {
  @Expose()
  @ApiProperty({
    type: Number,
    example: randomInt(100),
  })
  id: number;

  @Expose()
  @ApiProperty({
    type: String,
    example: 'T-shirt',
  })
  name: string;
}

@Exclude()
class UpdateUserProductPresenterProduct extends ProductModel {
  @Expose()
  @ApiProperty({
    type: Number,
    example: randomInt(100),
  })
  id: number;

  @Expose()
  @ApiProperty({
    type: String,
    example: 'California Special T-Shirt',
  })
  name: string;

  @Expose()
  @ApiProperty({
    type: [UpdateUserProductPresenterProductCategories],
  })
  categories: UpdateUserProductPresenterProductCategories[];
}

@Exclude()
class UpdateUserProductPresenterUser extends UserModel {
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
export class UpdateUserProductPresenter extends UserProductModel {
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
    type: Number,
    example: randomInt(100),
  })
  productId: number;

  @Expose()
  @ApiProperty({
    type: String,
    example: randomUUID(),
  })
  userId: string;

  @Expose()
  @ApiProperty({
    type: Date,
    example: new Date(),
  })
  createdAt: Date;

  @Expose()
  @ApiProperty({
    type: Date,
    example: new Date(),
  })
  updatedAt: Date;

  @Expose()
  @ApiProperty({
    type: UpdateUserProductPresenterProduct,
  })
  product: UpdateUserProductPresenterProduct;

  @Expose()
  @ApiProperty({
    type: UpdateUserProductPresenterUser,
  })
  user: UpdateUserProductPresenterUser;
}
