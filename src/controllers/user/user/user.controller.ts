import { Post, Controller, Body, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/user/createUser';
import { UserService } from 'src/services/user/user/user.service';

@Controller()
export class UserController {

    constructor(private readonly userService: UserService) { }
    @Post('/signup')
    createUser(@Body() CreateUserDto: CreateUserDto) {
            return this.userService.signupUser(CreateUserDto);
    }

    @Post('/login')
    loginUser(@Body() CreateUserDto: CreateUserDto) {
        return this.userService.loginUser(CreateUserDto);
    }
} 