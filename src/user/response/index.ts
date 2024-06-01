import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from './../user.entity';
import { Prisma } from '@prisma/client';

export type UserWithDeps = Prisma.UserGetPayload<{
  include: { Todo: true };
}>;

export class UserListResponse {
  @ApiProperty({ type: [UserEntity] })
  users: UserEntity[];
}

export class UserResponse {
  @ApiProperty({ type: UserEntity })
  user: UserEntity;
}
