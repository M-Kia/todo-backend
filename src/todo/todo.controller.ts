import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { TodoService } from './todo.service';
import { TodoListResponse, TodoResponse } from './response';
import { TodoCreateDto, TodoUpdateDto } from './dto';
import { AuthGuard } from 'src/auth/auth.gaurd';
import { RequestWithAuth } from 'src/auth/type';

@ApiTags('todo')
@Controller('todo')
export class TodoController {
  constructor(private readonly service: TodoService) {}

  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create new Todo' })
  @ApiCreatedResponse({
    description: 'Returns the created Todo',
    type: TodoResponse,
  })
  async create(@Req() request: RequestWithAuth, @Body() dto: TodoCreateDto) {
    return {
      todo: await this.service.create(request.owner_id, dto),
    };
  }
  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({
    summary: 'Get list of Todo',
  })
  @ApiOkResponse({
    description: 'Return a list of Todo',
    type: TodoListResponse,
  })
  async getTodo(@Req() request: RequestWithAuth) {
    return {
      todo: await this.service.getList(request.owner_id),
    };
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiOperation({
    summary: 'Get Todo by ID',
  })
  @ApiOkResponse({
    description: 'Return the Todo',
    type: TodoResponse,
  })
  @ApiNotFoundResponse({
    description: 'It occurs when there is no Todo with the entry ID.',
    type: NotFoundException,
  })
  async getTodoById(@Req() request: RequestWithAuth, @Param('id') id: string) {
    return {
      todo: await this.service.getOne(request.owner_id, id),
    };
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update Todo password' })
  @ApiOkResponse({
    description: 'Return updated Todo',
    type: TodoResponse,
  })
  @ApiNotFoundResponse({
    description: 'It occurs when there is no Todo with the entry ID.',
    type: NotFoundException,
  })
  async update(
    @Req() request: RequestWithAuth,
    @Param('id') id: string,
    @Body() dto: TodoUpdateDto,
  ) {
    return await this.service.update(request.owner_id, id, dto);
  }

  @UseGuards(AuthGuard)
  @Delete('id')
  @ApiOperation({
    summary: 'Delete a Todo with its ID',
  })
  @ApiNotFoundResponse({
    description: 'It occurs when there is no Todo with the entry ID.',
    type: NotFoundException,
  })
  async delete(@Req() request: RequestWithAuth, @Param('id') id: string) {
    await this.service.delete(request.owner_id, id);
  }
}
