import { IsOptional, IsEnum } from 'class-validator';
import { Status } from '@prisma/client';

export class UpdateTaskDto {
  @IsOptional()
  title?: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  @IsEnum(Status)
  status?: Status;
}
