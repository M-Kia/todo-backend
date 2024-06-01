import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import validation from 'src/common/validation-message';

export class TodoReorderDto {
  @IsNumber(undefined, { message: validation.number })
  @IsNotEmpty({ message: validation.not_empty })
  @ApiProperty()
  order: number;
}
