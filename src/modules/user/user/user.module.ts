import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from 'src/controllers/user/user/user.controller';
import { User } from 'src/entities/user/user';
import { UserService } from 'src/services/user/user/user.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [TypeOrmModule.forFeature([User]),
    JwtModule.register({
        secret: 'yourSecretKey', // Replace with your secret key
        signOptions: { expiresIn: '1h' },
    }),
    ],
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule { }