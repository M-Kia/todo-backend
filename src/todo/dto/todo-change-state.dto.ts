import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import validation from 'src/common/validation-message';

export class TodoChangeStateDto {
  @IsString({ each: true })
  @IsArray({ message: validation.array })
  @IsNotEmpty({ message: validation.not_empty })
  @ApiProperty()
  todo_ids: string[];

  @MinLength(10, { message: validation.min })
  @MaxLength(164, { message: validation.max })
  @IsString({ message: validation.string })
  @IsNotEmpty({ message: validation.not_empty })
  @ApiProperty()
  column_id: string;
}
