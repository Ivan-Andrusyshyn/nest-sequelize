import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from 'src/tasks/interfaces/task.interface';
import { TasksDto } from './dto/createTask.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';

@Controller('/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async getTasks(): Promise<Task[]> {
    return this.tasksService.getTasks();
  }

  @Get('/:id')
  async getOneById(@Param('id') taskId: string): Promise<Task> {
    return this.tasksService.getOneById(taskId);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async createTask(@Body() taskDto: TasksDto): Promise<Task> {
    return this.tasksService.createTask(taskDto);
  }

  @Delete('/:id')
  async deleteTask(@Param('id') taskId: string): Promise<void> {
    await this.tasksService.deleteTask(taskId);
  }

  @Put('/:id')
  async updateTask(
    @Param('id') taskId: string,
    @Body() updateTask: TasksDto,
  ): Promise<Task> {
    return this.tasksService.updateTask({ id: taskId, ...updateTask });
  }

  @Patch('/:id/status')
  async updateTasksStatus(
    @Param('id') taskId: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;
    return this.tasksService.updateTasksStatus(taskId, status);
  }
}
