import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { RolesGuard } from 'src/common/guards/roles.guards';

@Module({
  providers: [RolesGuard],
  controllers: [AdminController]
})
export class AdminModule {}
