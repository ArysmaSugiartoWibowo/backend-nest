import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { RolesGuard } from 'src/common/guards/roles.guards';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [RolesGuard,PrismaService],
  controllers: [AdminController],
})
export class AdminModule {}
