import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ColumnCreateDto, ColumnUpdateDto } from './dto';
import { ColumnWithDeps } from './response';
import { ColumnEntity } from './column.entity';

@Injectable()
export class ColumnService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: ColumnCreateDto): Promise<ColumnEntity> {
    try {
      const column = await this.prisma.column.create({
        data: {
          title: dto.title,
          send_mail: dto.send_mail ?? false,
        },
      });

      return column;
    } catch {
      throw new ConflictException();
    }
  }

  async getList(): Promise<ColumnWithDeps[]> {
    const columns = await this.prisma.column.findMany({
      include: { Todo: true },
    });

    return columns;
  }

  async getOne(id: string): Promise<ColumnWithDeps> {
    const column = await this.findBy('id', id);

    return column;
  }

  async update(id: string, dto: ColumnUpdateDto): Promise<ColumnEntity> {
    const previousColumn = await this.findBy('id', id);

    const data: Partial<ColumnEntity> = {};

    if (dto.title) {
      data.title = dto.title;
    }

    if (dto.send_mail) {
      data.send_mail = dto.send_mail;
    }

    if (Object.keys(data).length === 0) {
      return previousColumn;
    }

    try {
      const column = await this.prisma.column.update({
        where: { id },
        data: {
          title: dto.title ?? previousColumn.title,
          send_mail: dto.send_mail ?? previousColumn.send_mail,
        },
      });

      return column;
    } catch {
      throw new ConflictException();
    }
  }

  async delete(id: string) {
    await this.findBy('id', id);

    await this.prisma.column.delete({
      where: { id },
    });
  }

  async findBy(
    property: keyof ColumnEntity,
    value: any,
    throwable: boolean = false,
  ): Promise<ColumnWithDeps> {
    const column = await this.prisma.column.findFirst({
      where: { [property]: value },
      include: { Todo: true },
    });

    if (!column && throwable) {
      throw new NotFoundException();
    }

    return column;
  }
}
