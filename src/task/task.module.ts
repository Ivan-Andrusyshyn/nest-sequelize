import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { TaskController } from './tasks.controller';
import { TaskService } from './task.service';
import { TaskModel } from 'src/models/task.model';

@Module({
  imports: [SequelizeModule.forFeature([TaskModel])],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
