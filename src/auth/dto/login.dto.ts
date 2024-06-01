import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import validation from 'src/common/validation-message';

export class LoginDto {
  @MinLength(5, { message: validation.min })
  @MaxLength(150, { message: validation.max })
  @IsEmail(undefined, { message: validation.email })
  @IsString({ message: validation.string })
  @IsNotEmpty({ message: validation.not_empty })
  @ApiProperty()
  email: string;

  @MinLength(6, { message: validation.min })
  @MaxLength(164, { message: validation.max })
  @IsString({ message: validation.string })
  @IsNotEmpty({ message: validation.not_empty })
  @ApiProperty()
  password: string;
}
