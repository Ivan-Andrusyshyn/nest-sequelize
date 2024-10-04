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
  getHello(): Task[] {
    return this.tasksService.getTasks();
  }

  @Get('/:id')
  getOneById(@Param('id') taskId: string): Task {
    return this.tasksService.getOneById(taskId);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createTask(@Body() taskDto: TasksDto) {
    return this.tasksService.createTask(taskDto);
  }
  @Delete('/:id')
  deleteTask(@Param('id') taskId: string): Task[] {
    const tasks = this.tasksService.deleteTask(taskId);
    return tasks;
  }

  @Put('/:id')
  updateTask(@Param('id') taskId: string, @Body() updateTask: TasksDto) {
    const tasks = this.tasksService.updateTask({ id: taskId, ...updateTask });
    return tasks;
  }

  @Patch('/:id/status')
  updateTasksStatus(
    @Param('id') taskId: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ) {
    const { status } = updateTaskStatusDto;
    const tasks = this.tasksService.updateTasksStatus(taskId, status);
    return tasks;
  }
}
