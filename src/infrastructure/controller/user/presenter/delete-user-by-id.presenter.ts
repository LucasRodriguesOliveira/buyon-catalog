import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { randomUUID } from 'crypto';
import { UserModel } from 'src/domain/model/user.model';

@Exclude()
export class DeleteUserByIdPresenter extends UserModel {
  @Expose()
  @ApiProperty({
    type: String,
    example: randomUUID(),
  })
  id: string;

  @Expose()
  @ApiProperty({
    type: Date,
    example: new Date(),
  })
  deletedAt?: Date;
}
