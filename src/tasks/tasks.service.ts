import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Task as TaskModel } from './task.model';
import { TaskStatus } from './task-status.enum';
import { RequestTask, Task } from 'src/tasks/interfaces/task.interface';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(TaskModel) private readonly taskModel: typeof TaskModel,
  ) {}

  async getTasks(): Promise<TaskModel[]> {
    return this.taskModel.findAll();
  }

  async createTask(reqTask: RequestTask): Promise<TaskModel> {
    const task = new this.taskModel({
      title: reqTask.title,
      description: reqTask.description,
      status: TaskStatus.OPEN,
    });
    return task.save();
  }

  async getOneById(taskId: string): Promise<TaskModel> {
    return this.taskModel.findByPk(taskId);
  }

  async deleteTask(taskId: string): Promise<void> {
    const task = await this.getOneById(taskId);
    if (task) {
      await task.destroy();
    }
  }

  async updateTasksStatus(
    taskId: string,
    status: TaskStatus,
  ): Promise<TaskModel> {
    const task = await this.getOneById(taskId);
    if (task) {
      task.status = status;
      await task.save();
    }
    return task;
  }

  async updateTask(updatedTask: Task): Promise<TaskModel> {
    const task = await this.getOneById(updatedTask.id);
    if (task) {
      task.title = updatedTask.title;
      task.description = updatedTask.description;
      task.status = updatedTask.status;
      await task.save();
    }
    return task;
  }
}
