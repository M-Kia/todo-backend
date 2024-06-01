import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserCreateDto, UserUpdateDto } from './dto';
import { cleanStr, stringToHash } from 'src/helpers/string.helpers';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: UserCreateDto): Promise<User> {
    const email = cleanStr(dto.email);
    await this.validateExistEmail(email);

    try {
      const user = await this.prisma.user.create({
        data: {
          email,
          password: stringToHash(dto.password),
        },
      });

      return user;
    } catch {
      throw new ConflictException();
    }
  }

  async getList(): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      include: { Todo: { include: { column: true } } },
    });

    return users;
  }

  async getOne(id: string): Promise<User> {
    const user = await this.findBy('id', id);

    return user;
  }

  async update(id: string, dto: UserUpdateDto): Promise<User> {
    await this.getOne(id);

    try {
      const user = await this.prisma.user.update({
        where: { id },
        data: { password: stringToHash(dto.password) },
      });

      return user;
    } catch {
      throw new ConflictException();
    }
  }

  async delete(id: string): Promise<void> {
    await this.getOne(id);

    await this.prisma.user.delete({
      where: { id },
    });
  }

  async findBy(
    property: keyof User,
    value: any,
    throwable: boolean = true,
  ): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: { [property]: value },
      include: {
        Todo: {
          include: {
            column: true,
          },
        },
      },
    });

    if (!user && throwable) {
      throw new NotFoundException();
    }

    return user;
  }

  async validateExistEmail(
    email: string,
    throwable: boolean = true,
  ): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: { email },
    });

    if (user && throwable) {
      throw new ConflictException('Email already exists');
    }

    return user;
  }
}
