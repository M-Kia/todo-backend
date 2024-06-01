import { Module } from '@nestjs/common';
import { ColumnService } from './column.service';
import { ColumnController } from './column.controller';

@Module({
  providers: [ColumnService],
  controllers: [ColumnController],
  exports: [ColumnService],
})
export class UserModule {}
