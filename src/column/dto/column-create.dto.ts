import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import validation from 'src/common/validation-message';

export class ColumnCreateDto {
  @MinLength(5, { message: validation.min })
  @MaxLength(100, { message: validation.max })
  @IsString({ message: validation.string })
  @IsNotEmpty({ message: validation.not_empty })
  @ApiProperty()
  title: string;

  @MinLength(10, { message: validation.min })
  @MaxLength(164, { message: validation.max })
  @IsBoolean({ message: validation.boolean })
  @IsOptional()
  @ApiProperty({ default: false, required: false })
  send_mail?: boolean;
}
