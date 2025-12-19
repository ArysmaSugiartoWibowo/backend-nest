import { IsNotEmpty, IsOptional, IsEnum, IsInt } from 'class-validator';
import { Status } from '@prisma/client';

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  description?: string;

  @IsInt()
  projectId: number;

  @IsOptional()
  @IsEnum(Status)
  status?: Status;
}
