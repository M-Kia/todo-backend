import { ApiProperty } from '@nestjs/swagger';
import { ColumnEntity } from '../column.entity';
import { Prisma } from '@prisma/client';

export type ColumnWithDeps = Prisma.ColumnGetPayload<{
  include: { Todo: true };
}>;

export class ColumnListResponse {
  @ApiProperty({ type: [ColumnEntity] })
  columns: ColumnEntity[];
}

export class ColumnResponse {
  @ApiProperty({ type: ColumnEntity })
  column: ColumnEntity;
}
