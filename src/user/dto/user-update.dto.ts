import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import validation from 'src/common/validation-message';

export class UserUpdateDto {
  @MinLength(6, { message: validation.min })
  @MaxLength(164, { message: validation.max })
  @IsString({ message: validation.string })
  @IsNotEmpty({ message: validation.not_empty })
  @ApiProperty({ required: false })
  password: string;
}
