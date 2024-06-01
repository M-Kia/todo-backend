import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import validation from 'src/common/validation-message';

export class TodoCreateDto {
  @MinLength(5, { message: validation.min })
  @MaxLength(255, { message: validation.max })
  @IsString({ message: validation.string })
  @IsNotEmpty({ message: validation.not_empty })
  @ApiProperty()
  description: string;

  @MinLength(10, { message: validation.min })
  @MaxLength(164, { message: validation.max })
  @IsString({ message: validation.string })
  @IsNotEmpty({ message: validation.not_empty })
  @ApiProperty()
  column_id: string;

  @IsNumber(undefined, { message: validation.number })
  @IsOptional()
  @ApiProperty({ required: false })
  order?: number;
}
