import { ApiProperty } from '@nestjs/swagger';

export class ColumnEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  send_mail: boolean;
}
