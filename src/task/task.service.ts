import { Injectable } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { RequestTask, Task } from './interfaces/task.interface';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async getTasksForUser(userId: string): Promise<any[]> {
    return this.taskRepository.getTasks(userId);
  }

  async createTask(userId: string, reqTask: RequestTask): Promise<any> {
    return this.taskRepository.createTask(userId, reqTask);
  }

  async getOneById(taskId: number, userId: string): Promise<any | null> {
    return this.taskRepository.getOneById(taskId, userId);
  }

  async deleteTask(taskId: number, userId: string): Promise<void> {
    await this.taskRepository.deleteTask(taskId, userId);
  }

  async updateTask(updatedTask: Task, userId: string): Promise<any | null> {
    return this.taskRepository.updateTask(updatedTask, userId);
  }

  async updateTasksStatus(
    taskId: number,
    status: TaskStatus,
    userId: string,
  ): Promise<any | null> {
    return this.taskRepository.updateTasksStatus(taskId, status, userId); // Include userId in the repository call
  }
}
