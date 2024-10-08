import { Injectable } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { InjectModel } from '@nestjs/sequelize';
import {
  RequestTask,
  Task as TaskInterface,
} from 'src/task/interfaces/task.interface';
import { TaskModel } from 'src/models/task.model';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(TaskModel) private readonly taskModel: typeof TaskModel,
  ) {}

  async getTasksForUser(userId: string): Promise<TaskInterface[]> {
    return this.taskModel.findAll({ where: { userId } });
  }

  async createTask(
    userId: number,
    reqTask: RequestTask,
  ): Promise<TaskInterface> {
    const task = new TaskModel();

    task.title = reqTask.title;
    task.description = reqTask.description;
    task.status = TaskStatus.OPEN;
    task.userId = userId;

    return task.save();
  }

  async getOneById(taskId: number, userId: string): Promise<TaskModel | null> {
    return this.taskModel.findOne({ where: { id: taskId, userId } });
  }

  async deleteTask(taskId: number, userId: string): Promise<void> {
    const task = await this.getOneById(taskId, userId);
    if (task) {
      await task.destroy();
    }
  }

  async updateTask(
    updatedTask: TaskInterface,
    userId: string,
  ): Promise<TaskInterface | null> {
    const task = await this.getOneById(updatedTask.id, userId);
    if (task) {
      task.title = updatedTask.title;
      task.description = updatedTask.description;
      task.status = updatedTask.status;
      await task.save();
      return task;
    }
    return null;
  }

  async updateTasksStatus(
    taskId: number,
    status: TaskStatus,
    userId: string,
  ): Promise<TaskInterface | null> {
    const task = await this.getOneById(taskId, userId);
    if (task) {
      task.status = status;
      await task.save();
      return task;
    }
    return null;
  }
}
