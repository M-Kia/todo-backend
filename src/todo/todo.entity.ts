import { ApiProperty } from '@nestjs/swagger';

export class TodoEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  owner_id: string;

  @ApiProperty()
  column_id: string;

  @ApiProperty()
  order: number;

  constructor(partial: Partial<TodoEntity>) {
    Object.assign(this, partial);
  }
}
