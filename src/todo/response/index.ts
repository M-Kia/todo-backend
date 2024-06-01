import { ApiProperty } from '@nestjs/swagger';
import { TodoEntity } from '../todo.entity';
import { Prisma } from '@prisma/client';

export type TodoWithDeps = Prisma.TodoGetPayload<{
  include: { column: true; owner: true };
}>;

export class TodoListResponse {
  @ApiProperty({ type: [TodoEntity] })
  todo: TodoEntity[];
}

export class TodoResponse {
  @ApiProperty({ type: TodoEntity })
  todo: TodoEntity;
}
