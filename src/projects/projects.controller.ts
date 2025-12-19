import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { JwtAuthGuard } from 'src/auth/dto/guards/jwt.guard';
import { CurrentUser } from '../common/decorators/user.decorator';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@UseGuards(JwtAuthGuard)
@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Post()
  create(
    @CurrentUser() user:{sub: number},
    @Body() dto: CreateProjectDto,
  ) {
    return this.projectsService.create(user.sub, dto);
  }

  @Get()
  findAll(@CurrentUser() user: {sub: number}) {
    return this.projectsService.findAll(user.sub);
  }

  @Get(':id')
  findOne(
    @CurrentUser() user: {sub: number},
    @Param('id') id: string,
  ) {
    return this.projectsService.findOne(user.sub, Number(id));
  }

  @Patch(':id')
  update(
    @CurrentUser() user: {sub: number},
    @Param('id') id: string,
    @Body() dto: UpdateProjectDto,
  ) {
    return this.projectsService.update(
      user.sub,
      Number(id),
      dto,
    );
  }

  @Delete(':id')
  remove(
    @CurrentUser() user: {sub: number},
    @Param('id') id: string,
  ) {
    return this.projectsService.remove(user.sub, Number(id));
  }
}
