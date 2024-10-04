import { Injectable } from '@nestjs/common';
import { Task, RequestTask } from 'src/tasks/interfaces/task.interface';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    { id: '1', title: 'test1', description: 'test desc1', status: 'OPEN' },
    { id: '2', title: 'test2', description: 'test desc2', status: 'OPEN' },
  ];

  getTasks(): Task[] {
    return this.tasks;
  }

  createTask(reqTask: RequestTask): Task[] {
    const task = {
      id: new Date().toISOString(),
      status: 'OPEN',
      ...reqTask,
    };
    this.tasks.push(task);
    return this.tasks;
  }

  getOneById(taskId: string): Task {
    const tasksIndex = this.tasks.findIndex((task) => task.id === taskId);
    return this.tasks[tasksIndex];
  }

  deleteTask(taskId: string): Task[] {
    const tasksIndex = this.tasks.findIndex((task) => task.id === taskId);

    if (tasksIndex !== -1) {
      this.tasks.splice(tasksIndex, 1);
    }
    return this.tasks;
  }

  updateTasksStatus(taskId: string, status: TaskStatus): Task {
    const tasksIndex = this.tasks.findIndex((task) => task.id === taskId);
    this.tasks[tasksIndex].status = status;
    return this.tasks[tasksIndex];
  }

  updateTask(updatedTask: Task): Task[] {
    const tasksIndex = this.tasks.findIndex(
      (task) => task.id === updatedTask.id,
    );

    this.tasks[tasksIndex] = updatedTask;
    return this.tasks;
  }
}
