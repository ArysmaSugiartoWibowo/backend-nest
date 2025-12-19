import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
    constructor(private prisma: PrismaService) {}
    async create(userId:number,dto: CreateTaskDto){
        const project = await this.prisma.project.findUnique({
            where:{
                id: dto.projectId
            }
        });
        if (!project || project.ownerId !== userId) {
         throw new ForbiddenException()
        }

        return this.prisma.task.create({data:dto});
    }

    async findAll(userId:number,projectId:number) {
        const project = await this.prisma.project.findUnique({
            where:{
                id: projectId
            }
        });
        if (!project || project.ownerId !== userId) {
         throw new ForbiddenException()
        }

        return this.prisma.task.findMany({
            where:{
                projectId
            },
            orderBy:{
                createdAt:'desc'
            }
        });
                
    }

    async findOne(userId:number,id: number) {
        const task = await this.prisma.task.findUnique({where:{id}});
        
        if(!task){
            throw new ForbiddenException()
        }
        
        const project = await this.prisma.project.findUnique({where:{id: task.projectId}});

        if(!project || project.ownerId !== userId){
            throw new ForbiddenException()
        }

        return task;
        
    }

    async update(userId:number,id: number, dto: UpdateTaskDto) {
        await this.findOne(userId,id);
        return this.prisma.task.update({
            where:{id},
            data:dto
        });
    }

    async remove(userId:number,id: number) {
        await this.findOne(userId,id);
        return this.prisma.task.delete({where:{id}});
    }



            
    
}
