import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user/user';
import { UserModule } from './modules/user/user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host:'localhost',
    port:3306,
    username:'ajmal',
    password:'Ajmal@9995',
    database:'lottery',
    entities:[User],
    synchronize:true,
  }),
UserModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}