import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';
import { randomInt, randomUUID } from 'crypto';
import { CategoryModel } from 'src/domain/model/category.model';
import { ProductModel } from 'src/domain/model/product.model';
import { UserProductModel } from 'src/domain/model/user-product.model';
import { UserModel } from 'src/domain/model/user.model';

@Exclude()
class CreateUserProductPresenterUser extends UserModel {
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
class CreateUserProductPresenterProductCategory extends CategoryModel {
  @Expose()
  @ApiProperty({
    type: Number,
    example: randomInt(100),
  })
  id: number;

  @Expose()
  @ApiProperty({
    type: String,
    example: 'Clothe',
  })
  name: string;
}

@Exclude()
class CreateUserProductPresenterProduct extends ProductModel {
  @Expose()
  @ApiProperty({
    type: Number,
    example: randomInt(100),
  })
  id: number;

  @Expose()
  @ApiProperty({
    type: String,
    example: 'Sneaker',
  })
  name: string;

  @Expose()
  @ApiProperty({
    type: Boolean,
    example: true,
  })
  active: boolean;

  @Expose()
  @ApiProperty({
    type: [CreateUserProductPresenterProductCategory],
  })
  categories: CreateUserProductPresenterProductCategory[];
}

@Exclude()
export class CreateUserProductPresenter extends UserProductModel {
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
    type: CreateUserProductPresenterUser,
  })
  user: CreateUserProductPresenterUser;

  @Expose()
  @ApiProperty({
    type: CreateUserProductPresenterProduct,
  })
  product: CreateUserProductPresenterProduct;
}
