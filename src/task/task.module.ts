import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { TaskController } from './tasks.controller';
import { TaskService } from './task.service';
import { TaskRepository } from './task.repository';
import { TaskModel } from 'src/models/task.model';

@Module({
  imports: [SequelizeModule.forFeature([TaskModel])],
  controllers: [TaskController],
  providers: [TaskService, TaskRepository],
})
export class TaskModule {}
