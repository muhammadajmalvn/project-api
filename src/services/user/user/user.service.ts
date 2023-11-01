import { Injectable, ConflictException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/dto/user/createUser';
import { User } from 'src/entities/user/user';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,

        private jwtService: JwtService
    ) { }

    async signupUser(userDetails: CreateUserDto) {
        try {
            const newUser = await this.userRepository.create({
                ...userDetails,
                createdAt: new Date()
            });
            const savedUser = await this.userRepository.save(newUser);
            return savedUser;
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                throw new ConflictException('User already exists');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async loginUser(userDetails: CreateUserDto) {
        const { email, password } = userDetails;
        try {
            const user = await this.userRepository.findOne({ where: { email } });
            if (user) {
                if (user.password === password) {
                    const token = (await this.tokenGenerate({ id: user.id, email: user.email })).accessToken;
                    let userData = { id: user.id, email: user.email, token };
                    return userData;
                } else {
                    throw new UnauthorizedException('Invalid Credentials');
                }
            } else {
                throw new UnauthorizedException('User does not exist');
            }
        } catch (error) {
            if (error instanceof UnauthorizedException) {
                throw error
            } else {
                throw new InternalServerErrorException();
            }
        }
    }


    async tokenGenerate(
        payload: { id: number, email: string }
    ): Promise<{ accessToken: string; }> {

        const accessToken = await this.jwtService.sign({ ...payload });

        return { accessToken };
    }
}


