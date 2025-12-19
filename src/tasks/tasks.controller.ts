import { Controller, UseGuards, Post, Body, Get, Param, Patch, Delete, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from 'src/auth/dto/guards/jwt.guard';
import { CurrentUser } from '../common/decorators/user.decorator';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post()
  create(@CurrentUser() user: { sub: number }, @Body() dto: CreateTaskDto) {
    return this.tasksService.create(user.sub, dto);
  }

  @Get()
  findAll(@CurrentUser() user: { sub: number }, @Query('projectId') projectId: number) {
    return this.tasksService.findAll(user.sub, Number(projectId));
  }

  @Get(':id')
  findOne(@CurrentUser() user: { sub: number }, @Param('id') id: string) {
    return this.tasksService.findOne(user.sub, Number(id));
  }

  @Patch(':id')
  update(@CurrentUser() user: { sub: number }, @Param('id') id: string, @Body() dto: UpdateTaskDto) {
    return this.tasksService.update(user.sub, Number(id), dto);
  }

  @Delete(':id')
  remove(@CurrentUser() user: { sub: number }, @Param('id') id: string) {
    return this.tasksService.remove(user.sub, Number(id));
  }
}
