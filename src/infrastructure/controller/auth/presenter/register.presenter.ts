import { Exclude, Expose } from 'class-transformer';
import { CreateUserPresenter } from '../../user/presenter/create-user.presenter';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class RegisterPresenter {
  @Expose()
  @ApiProperty({
    type: CreateUserPresenter,
  })
  user: CreateUserPresenter;

  @Expose()
  @ApiProperty({
    type: String,
  })
  access_token: string;
}
