import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Todo } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import { ColumnService } from 'src/column/column.service';
import { TodoChangeStateDto, TodoCreateDto, TodoUpdateDto } from './dto';
import { TodoWithDeps } from './response';
import { TodoEntity } from './todo.entity';

@Injectable()
export class TodoService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
    private readonly columnService: ColumnService,
  ) {}

  async create(owner_id: string, dto: TodoCreateDto): Promise<Todo> {
    await this.userService.getOne(owner_id);
    const column = await this.columnService.getOne(dto.column_id);
    try {
      const todo = await this.prisma.todo.create({
        data: {
          description: dto.description,
          order: column.Todo.length,
          owner_id,
          column_id: dto.column_id,
        },
      });

      await this.reorderTodo(owner_id, todo.id, dto.order);

      return todo;
    } catch {
      throw new ConflictException();
    }
  }

  async getList(ownerId: string): Promise<TodoWithDeps[]> {
    return await this.prisma.todo.findMany({
      where: {
        owner_id: ownerId,
      },
      include: {
        column: true,
        owner: true,
      },
    });
  }

  async getOne(owner_id: string, id: string): Promise<TodoWithDeps> {
    const todo = await this.findBy('id', id);

    if (todo.owner_id !== owner_id) {
      throw new NotFoundException();
    }

    return todo;
  }

  async update(
    owner_id: string,
    id: string,
    dto: TodoUpdateDto,
  ): Promise<TodoEntity> {
    await this.getOne(owner_id, id);

    try {
      const todo = await this.prisma.todo.update({
        where: { id },
        data: {
          description: dto.description,
        },
      });

      return todo;
    } catch {
      throw new ConflictException();
    }
  }

  async changeColumn(owner_id: string, dto: TodoChangeStateDto): Promise<void> {
    const todoList = await this.prisma.todo.findMany({
      where: {
        id: {
          in: dto.todo_ids,
        },
        owner_id,
      },
    });

    if (todoList.length !== dto.todo_ids.length) {
      throw new ConflictException();
    }

    try {
      await this.prisma.todo.updateMany({
        where: { id: { in: dto.todo_ids } },
        data: { column_id: dto.column_id },
      });
    } catch {
      throw new ConflictException();
    }
  }

  async delete(owner_id: string, id: string): Promise<void> {
    await this.getOne(owner_id, id);

    try {
      await this.prisma.todo.delete({
        where: { id },
      });
    } catch {
      throw new ConflictException();
    }
  }

  async findBy(
    property: keyof TodoEntity,
    value: any,
    throwable: boolean = true,
  ): Promise<TodoWithDeps> {
    const todo = await this.prisma.todo.findFirst({
      where: { [property]: value },
      include: { column: true, owner: true },
    });

    if (!todo && throwable) {
      throw new ConflictException();
    }

    return todo;
  }

  async reorderTodo(
    owner_id: string,
    id: string,
    order: number,
  ): Promise<TodoEntity> {
    const todo = await this.getOne(owner_id, id);

    if (todo.order === order) {
      return todo;
    }

    const column = await this.columnService.getOne(todo.column_id);

    if (column.Todo.length <= order) {
      throw new ConflictException();
    }

    let orderCondition: Prisma.IntFilter = {
      gt: todo.order,
      lte: order,
    };
    let orderChange: Prisma.IntFieldUpdateOperationsInput = {
      decrement: 1,
    };

    if (todo.order > order) {
      orderCondition = {
        gte: order,
        lt: todo.order,
      };
      orderChange = {
        increment: 1,
      };
    }
    try {
      await this.prisma.todo.updateMany({
        where: {
          order: orderCondition,
          owner_id: owner_id,
          column_id: column.id,
        },
        data: {
          order: orderChange,
        },
      });

      return await this.prisma.todo.update({
        where: { id },
        data: {
          order,
        },
      });
    } catch {
      throw new ConflictException();
    }
  }
}
