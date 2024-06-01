import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginResponse } from './response';
import { LoginDto } from './dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post()
  @ApiOperation({ summary: 'Login or Signup user' })
  @ApiOkResponse({ type: LoginResponse })
  async login(@Body() dto: LoginDto) {
    return await this.service.login(dto);
  }
}
