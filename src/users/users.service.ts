import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
    constructor(private prisma : PrismaService) {}
    findById(id: number){
        return this.prisma.user.findUnique({
             where :{id},
             select:{
                id:true,
                email:true,
                name:true,
                role:true,
                createdAt:true,
            }
         });
     }
     updateProfile(id: number, data: { name?: string; password?: string ,email:string,role: 'USER' | 'ADMIN' }){
        return this.prisma.user.update({
            where: { id },
            data,
            select:{
                id:true,
                email:true,
                name:true,
                role:true,
            }
        });
    }
}