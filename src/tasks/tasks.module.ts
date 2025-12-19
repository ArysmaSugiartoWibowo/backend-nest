import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  controllers: [TasksController],
  providers: [TasksService, PrismaService,JwtStrategy],
})
export class TasksModule {}
