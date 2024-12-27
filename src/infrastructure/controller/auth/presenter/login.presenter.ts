import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class LoginPresenter {
  @ApiProperty({
    type: String,
  })
  @Expose()
  access_token: string;
}
