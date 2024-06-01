import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserCreateDto, UserUpdateDto } from './dto';
import { UserListResponse, UserResponse } from './response';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create new User' })
  @ApiCreatedResponse({
    description: 'Returns the created User',
    type: UserResponse,
  })
  async create(@Body() dto: UserCreateDto) {
    return {
      user: await this.service.create(dto),
    };
  }

  @Get()
  @ApiOperation({
    summary: 'Get list of User',
  })
  @ApiOkResponse({
    description: 'Return a list of Users',
    type: UserListResponse,
  })
  async getUsers() {
    return {
      users: await this.service.getList(),
    };
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get User by ID',
  })
  @ApiOkResponse({
    description: 'Return the User',
    type: UserResponse,
  })
  @ApiNotFoundResponse({
    description: 'It occurs when there is no User with the entry ID.',
    type: NotFoundException,
  })
  async getUserById(@Param('id') id: string) {
    return {
      users: await this.service.getOne(id),
    };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update User password' })
  @ApiOkResponse({
    description: 'Return updated User',
    type: UserResponse,
  })
  @ApiNotFoundResponse({
    description: 'It occurs when there is no User with the entry ID.',
    type: NotFoundException,
  })
  async update(@Param('id') id: string, @Body() dto: UserUpdateDto) {
    return await this.service.update(id, dto);
  }

  @Delete('id')
  @ApiOperation({
    summary: 'Delete a User with its ID',
  })
  @ApiNotFoundResponse({
    description: 'It occurs when there is no User with the entry ID.',
    type: NotFoundException,
  })
  async delete(@Param('id') id: string) {
    await this.service.delete(id);
  }
}
