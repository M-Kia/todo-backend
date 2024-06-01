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
import { ColumnService } from './column.service';
import { ColumnListResponse, ColumnResponse } from './response';
import { ColumnCreateDto, ColumnUpdateDto } from './dto';

@ApiTags('column')
@Controller('column')
export class ColumnController {
  constructor(private readonly service: ColumnService) {}

  @Post()
  @ApiOperation({ summary: 'Create new Column' })
  @ApiCreatedResponse({
    description: 'Returns the created Column',
    type: ColumnResponse,
  })
  async create(@Body() dto: ColumnCreateDto) {
    return {
      column: await this.service.create(dto),
    };
  }

  @Get()
  @ApiOperation({
    summary: 'Get list of Column',
  })
  @ApiOkResponse({
    description: 'Return a list of Columns',
    type: ColumnListResponse,
  })
  async getColumns() {
    return {
      columns: await this.service.getList(),
    };
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get Column by ID',
  })
  @ApiOkResponse({
    description: 'Return the Column',
    type: ColumnResponse,
  })
  @ApiNotFoundResponse({
    description: 'It occurs when there is no Column with the entry ID.',
    type: NotFoundException,
  })
  async getColumnById(@Param('id') id: string) {
    return {
      columns: await this.service.getOne(id),
    };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update Column password' })
  @ApiOkResponse({
    description: 'Return updated Column',
    type: ColumnResponse,
  })
  @ApiNotFoundResponse({
    description: 'It occurs when there is no Column with the entry ID.',
    type: NotFoundException,
  })
  async update(@Param('id') id: string, @Body() dto: ColumnUpdateDto) {
    return await this.service.update(id, dto);
  }

  @Delete('id')
  @ApiOperation({
    summary: 'Delete a Column with its ID',
  })
  @ApiNotFoundResponse({
    description: 'It occurs when there is no Column with the entry ID.',
    type: NotFoundException,
  })
  async delete(@Param('id') id: string) {
    await this.service.delete(id);
  }
}
