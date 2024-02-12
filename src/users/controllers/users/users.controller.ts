import { UsersService } from 'src/users/services/users/users.service';
import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dots/CreateUsers.dot';
import { LoginDto } from 'src/users/dots/Login.dto';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    @Get()
    getUsers() {
        
    }

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto, @Req() req) {
        console.log('Raw request body:', req.body);
        console.log('Received createUserDto:', createUserDto);
    
        const createdUser = await this.userService.createUser(createUserDto);
        
        console.log('Created user response:', createdUser);
        return createdUser;
    }
    @Post('login')
    async loginUser(@Body() loginDto: LoginDto) {
        const user = await this.userService.validateUser(loginDto.email, loginDto.password);

        if (user) {
            const token = this.userService.generateToken(user);
            const { id, email, name } = user;
            return { token, id, email, name };
        } else {
            return { message: 'Invalid credentials' };
        }
    }

}
