import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from './entity/user.entity';
import { StudentModel, TeacherModel } from './entity/person.entity';
import { AirplaneModel, BaseModel, BookModel, CarModel, ComputerModel, SignleBaseModel } from './entity/inheritance.entity';
import { ProfileModel } from './entity/profile.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserModel,
      ProfileModel,
    ]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'typeormstudy',
      entities: [
        UserModel,
        StudentModel,
        TeacherModel,
        BookModel,
        CarModel,
        SignleBaseModel,
        ComputerModel,
        AirplaneModel,
        ProfileModel,
      ],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}