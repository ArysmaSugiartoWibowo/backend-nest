import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService,PrismaService,JwtStrategy]
})
export class ProjectsModule {}
