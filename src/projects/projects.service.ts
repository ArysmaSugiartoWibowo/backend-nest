import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
    constructor(private prisma: PrismaService){}
    create(userId: number, data:{title: string, description?: string}) {
        return this.prisma.project.create({
            data: {
                ...data,
                ownerId: userId,
            }
        });
    }
      findAll(userId: number) {
    return this.prisma.project.findMany({
      where: { ownerId: userId },
      orderBy: { createdAt: 'desc' },
    });
  }
   async findOne(userId: number, id: number) {
    const project = await this.prisma.project.findUnique({
      where: { id },
    });

    if (!project || project.ownerId !== userId) {
      throw new ForbiddenException();
    }

    return project;
  }

async update(userId: number, id: number, data: UpdateProjectDto) {
  await this.findOne(userId, id);

  const updateData = Object.fromEntries(
    Object.entries(data).filter(([_, v]) => v !== undefined)
  );

  if (Object.keys(updateData).length === 0) {
    throw new BadRequestException('No data provided to update');
  }

  return this.prisma.project.update({
    where: { id },
    data: updateData,
  });
}


  async remove(userId: number, id: number) {
    await this.findOne(userId, id);
    return this.prisma.project.delete({
      where: { id },
    });
  }
    
}
