import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/user/user.entity';

export class LoginResponse {
  @ApiProperty()
  user: UserEntity;

  @ApiProperty()
  token: string;
}
