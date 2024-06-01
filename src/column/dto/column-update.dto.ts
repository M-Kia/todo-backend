import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import validation from 'src/common/validation-message';

export class ColumnUpdateDto {
  @MinLength(5, { message: validation.min })
  @MaxLength(100, { message: validation.max })
  @IsString({ message: validation.string })
  @IsOptional()
  @ApiProperty({ required: false })
  title?: string;

  @MinLength(10, { message: validation.min })
  @MaxLength(164, { message: validation.max })
  @IsBoolean({ message: validation.boolean })
  @IsOptional()
  @ApiProperty({ required: false })
  send_mail?: boolean;
}
