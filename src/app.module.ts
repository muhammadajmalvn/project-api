import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user/user';
import { UserModule } from './modules/user/user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host:'mydb.cgierxxflbsf.ap-south-1.rds.amazonaws.com',
    port:3306,
    username:'admin',
    password:'ajmal123',
    database:'defaultdb',
    entities:[User],
    synchronize:true,
  }),
UserModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}