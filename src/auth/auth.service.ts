import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto';
import { stringToHash } from 'src/helpers/string.helpers';
import { LoginResponse } from './response';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginDto): Promise<LoginResponse> {
    let user = await this.prisma.user.findFirst({
      where: { email: dto.email },
    });

    if (user) {
      if (stringToHash(dto.password) !== user.password) {
        throw new ConflictException();
      }
    } else {
      try {
        user = await this.prisma.user.create({
          data: {
            email: dto.email,
            password: stringToHash(dto.password),
          },
        });
      } catch {
        throw new ConflictException();
      }
    }

    const signedString = this.jwtService.sign(user.id);

    return {
      user,
      token: signedString,
    };
  }
}
