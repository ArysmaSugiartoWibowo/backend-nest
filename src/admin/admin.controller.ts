import { Controller, Get, Patch, Param, UseGuards, Body } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service'; 
import { JwtAuthGuard } from 'src/auth/dto/guards/jwt.guard'; 
import { RolesGuard } from 'src/common/guards/roles.guards'; 
import { Roles } from '../common/decorators/roles.decorator';
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
@Controller('admin')
export class AdminController {
constructor(private prisma: PrismaService) {}

  @Get('users')
  getUsers() {
    return this.prisma.user.findMany({
        select: { id: true, email: true, role: true, createdAt: true },
    });
  }
@Patch('user/:id/role')
updateRole(
    @Param('id') id: string,
    @Body() body:{role:'USER' | 'ADMIN'}
){
    return this.prisma.user.update({
        where:{id:Number(id)},
        data:{role:body.role}
    });
}
@Get('projects')
getProjects() {
    return this.prisma.project.findMany();
}
@Get('tasks')
getTasks() {
    return this.prisma.task.findMany();
}
}
