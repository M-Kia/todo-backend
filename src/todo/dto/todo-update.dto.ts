import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import validation from 'src/common/validation-message';

export class TodoUpdateDto {
  @MinLength(5, { message: validation.min })
  @MaxLength(255, { message: validation.max })
  @IsString({ message: validation.string })
  @IsNotEmpty({ message: validation.not_empty })
  @ApiProperty()
  description?: string;
}
