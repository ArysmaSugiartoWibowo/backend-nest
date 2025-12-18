import { Controller, Get, UseGuards,Patch,Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/dto/guards/jwt.guard';
import { CurrentUser } from 'src/common/decorators/user.decorator';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}
    @UseGuards(JwtAuthGuard)
    @Get('me')
    me(@CurrentUser() user: { sub: number , email: string , roles: 'USER' | 'ADMIN' }) {
        return this.userService.findById(user.sub);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('me')
    update(
        @CurrentUser() user: { sub: number, email: string; roles: 'USER' | 'ADMIN' },
        @Body() body: {
  email: string;
  role: 'USER' | 'ADMIN';
  password?: string;
  name?: string;
},
    ) {
        return this.userService.updateProfile(user.sub, body);
    }
}