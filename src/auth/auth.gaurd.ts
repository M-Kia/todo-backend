import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RequestWithAuth } from './type';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: RequestWithAuth = context.switchToHttp().getRequest();

    const { token } = request.body;

    try {
      const payload = this.jwtService.verify(token);

      request.owner_id = payload;

      const owner = await this.userService.getOne(payload);

      if (!owner) {
        throw new UnauthorizedException();
      }

      return true;
    } catch {
      throw new ForbiddenException('Invalid authorization token');
    }
  }
}
