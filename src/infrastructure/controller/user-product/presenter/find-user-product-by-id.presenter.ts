import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';
import { randomInt, randomUUID } from 'crypto';
import { CategoryModel } from 'src/domain/model/category.model';
import { ProductModel } from 'src/domain/model/product.model';
import { UserProductModel } from 'src/domain/model/user-product.model';
import { UserModel } from 'src/domain/model/user.model';

@Exclude()
class FindUserProductByIdPresenterUser extends UserModel {
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
class FindUserProductByIdPresenterProductCategories extends CategoryModel {
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
class FindUserProductByIdPresenterProduct extends ProductModel {
  @Expose()
  @ApiProperty({
    type: Number,
    example: randomInt(100),
  })
  id: number;

  @Expose()
  @ApiProperty({
    type: String,
    example: 'All Suns',
  })
  name: string;

  @Expose()
  @ApiProperty({
    type: [FindUserProductByIdPresenterProductCategories],
    isArray: true,
  })
  categories: FindUserProductByIdPresenterProductCategories[];
}

@Exclude()
export class FindUserProductByIdPresenter extends UserProductModel {
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
    type: String,
    example: randomUUID(),
  })
  userId: string;

  @Expose()
  @ApiProperty({
    type: Number,
    example: randomInt(100),
  })
  productId: number;

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
    type: FindUserProductByIdPresenterUser,
  })
  user: FindUserProductByIdPresenterUser;

  @Expose()
  @ApiProperty({
    type: FindUserProductByIdPresenterProduct,
  })
  product: FindUserProductByIdPresenterProduct;
}
