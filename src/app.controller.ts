import { Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Role, UserModel } from './entity/user.entity';
import { Repository } from 'typeorm';
import { ProfileModel } from './entity/profile.entity';

@Controller()
export class AppController {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
    @InjectRepository(ProfileModel)
    private readonly profileRepository: Repository<ProfileModel>
  ) {}

  @Post('users')
  postUser(){
    return this.userRepository.save({
      // title: 'test title'
    });
  }

  @Get('users')
  getUsers(){
    return this.userRepository.find({
      relations: {
        profile: true,
      }
    });
  }

  @Patch('users/:id')
  async patchUser(
    @Param('id') id: string,
  ){
    const user = await this.userRepository.findOne({
      where:{
        id: parseInt(id)
      }
    });

    return this.userRepository.save({
      ...user,
      // title: user.title + '0',
    });
  }

  @Post('user/profile')
  async createUserAndProfile(){
    const user = await this.userRepository.save({
      email: 'asdf@codefactory.ai'
    });

    const profile = await this.profileRepository.save({
      profileImg: 'asdf.jpg',
      user,
    });

    return user;
  }
}
