import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import { jwtModule } from 'src/modules.config';
import { AuthController } from './auth.controller';

@Module({
  imports: [ConfigModule, jwtModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
