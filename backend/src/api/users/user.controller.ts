import {
    Body,
    Controller,Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Put,
    } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './create-user.dto';
import { error } from 'console';

@Controller('api/users')
export class UserController {
    constructor(private readonly userService: UserService) {}
    @Get('/test')
    test() {
        return this.userService.test();
    }
    // Get all users
    @Get('/')
    async findAll() {
        try {
            return this.userService.findAll();
        } catch {
            throw new HttpException(
        {
            status: HttpStatus.NOT_FOUND,
            error: 'No User found',
        },
        HttpStatus.NOT_FOUND,
        { cause: error },
        );
        }
    }
    // Get one user via id
    @Get('/:id')
    async findOne(@Param('id') id: string) {
        try {
            return this.userService.findOne(id);
        } catch {
            throw new HttpException(
            {
                status: HttpStatus.NOT_FOUND,
                error: 'No User found',
            },
        HttpStatus.NOT_FOUND,
        { cause: error },
        );
        }
    }// Create/add a User
    @Post('/')
    async addUser(@Body() createUserDto: CreateUserDto) {
        try {
            await this.userService.create(createUserDto);
            return { action:'redirct', message: 'User added successfully' };
        } catch {
            throw new HttpException(
            {
                status: HttpStatus.BAD_REQUEST,
                error: 'Unable to add this user',
            },
        HttpStatus.BAD_REQUEST,
        { cause: error },
        );
        }
    }
    @Post('/login')
    async loginUser(@Body() createUserDto: CreateUserDto) {
        
        try {
            return await this.userService.login(createUserDto);
        } catch {
            throw new HttpException(
            {
                status: HttpStatus.BAD_REQUEST,
                error: 'Unable to login this user',
            },
        HttpStatus.BAD_REQUEST,
        { cause: error },
        );
        }
    }




    // Update a User
    @Put('/:id')
    async updateUser(
        @Param('id') id: string,
        @Body() createUserDto: CreateUserDto,
        ) {
        try {
            await this.userService.update(id, createUserDto);
            return { message: 'User updated successfully' };
        } catch {
            throw new HttpException(
            {
                status: HttpStatus.BAD_REQUEST,
                error: 'Unable to update this User',
            },
            HttpStatus.BAD_REQUEST,
            { cause: error },
            );
        }
    }
    // Delete a User via id
    @Delete('/:id')
    async deleteUser(@Param('id') id: string) {
        try {
            return await await this.userService.delete(id);
        } catch {
            throw new HttpException(
        {
            status: HttpStatus.NOT_FOUND,
            error: 'No such a User',
        },
        HttpStatus.NOT_FOUND,
        { cause: error },
        );
        }
    }
}