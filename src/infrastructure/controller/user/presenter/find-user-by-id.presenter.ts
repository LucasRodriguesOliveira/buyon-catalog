import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { randomUUID } from 'crypto';
import { UserModel } from 'src/domain/model/user.model';

@Exclude()
export class FindUserByIdPresenter extends UserModel {
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

  @Expose()
  @ApiProperty({
    type: String,
    example: 'Doe',
  })
  lastname: string;

  @Expose()
  @ApiProperty({
    type: String,
    example: 'john.doe@email.com',
  })
  email: string;

  @Expose()
  @ApiProperty({
    type: Boolean,
    example: true,
  })
  active: boolean;

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
}
