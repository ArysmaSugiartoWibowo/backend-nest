import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Role } from '@prisma/client';
import { access } from 'fs';

@Injectable()
export class AuthService {
    constructor(
        private prismaService: PrismaService,
        private jwt: JwtService
    ) {}

    async register(data: { email: string; name: string; password: string }) {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = await this.prismaService.user.create({
            data: {
                email: data.email,
                name: data.name,
                password: hashedPassword,   
            }
        });
        return {message : 'User registered successfully', userId: user.id};
    }

    async login(data: { email: string; password: string }) {
        const user = await this.prismaService.user.findUnique({
            where: { email: data.email },
        });

        if(!user){
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(data.password, user.password);

        if(!isPasswordValid){
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload={
            sub:user.id,
            email:user.email,
            role:user.role
        }

        return {
        access_token: this.jwt.sign(payload),
        }
    }
}