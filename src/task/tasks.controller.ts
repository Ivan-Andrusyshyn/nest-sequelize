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
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from 'src/task/interfaces/task.interface';
import { TasksDto } from './dto/createTask.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { AuthGuard, AuthUser } from 'src/common';

@UseGuards(AuthGuard)
@Controller('/tasks')
export class TaskController {
  constructor(private readonly tasksService: TaskService) {}

  @Get()
  async getTasks(@AuthUser() user): Promise<Task[]> {
    const userId = user.id;
    return this.tasksService.getTasksForUser(userId);
  }

  @Get('/:id')
  async getOneById(
    @Param('id') taskId: number,
    @AuthUser() user,
  ): Promise<Task> {
    const userId = user.id;

    return this.tasksService.getOneById(taskId, userId);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async createTask(@Body() taskDto: TasksDto, @AuthUser() user): Promise<Task> {
    const userId = user.id;

    return this.tasksService.createTask(userId, taskDto);
  }

  @Delete('/:id')
  async deleteTask(
    @Param('id') taskId: number,
    @AuthUser() user,
  ): Promise<void> {
    const userId = user.id;

    await this.tasksService.deleteTask(taskId, userId);
  }

  @Put('/:id')
  async updateTask(
    @Param('id') taskId: number,
    @Body() updateTask: TasksDto,
    @AuthUser() user,
  ): Promise<Task> {
    const userId = user.id;

    return this.tasksService.updateTask({ id: taskId, ...updateTask }, userId);
  }

  @Patch('/:id/status')
  async updateTasksStatus(
    @Param('id') taskId: number,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    @AuthUser() user,
  ): Promise<Task> {
    const userId = user.id;
    const { status } = updateTaskStatusDto;
    return this.tasksService.updateTasksStatus(taskId, status, userId);
  }
}
