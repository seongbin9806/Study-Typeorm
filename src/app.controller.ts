import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Role, UserModel } from './entity/user.entity';
import { Between, Equal, ILike, In, IsNull, LessThan, LessThanOrEqual, Like, MoreThan, MoreThanOrEqual, Not, Repository } from 'typeorm';
import { ProfileModel } from './entity/profile.entity';
import { PostModel } from './entity/post.entity';
import { TagModel } from './entity/\btag.entity';

@Controller()
export class AppController {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
    @InjectRepository(ProfileModel)
    private readonly profileRepository: Repository<ProfileModel>,
    @InjectRepository(PostModel)
    private readonly postRepository: Repository<PostModel>,
    @InjectRepository(TagModel)
    private readonly tagRepository: Repository<TagModel>
  ) {}

  @Post('sample')
  async sample(){
    // 모델에 해당되는 객체 생성 - 저장은 안함
    // const user1 = this.userRepository.create({
    //   email: 'seongbin9806@naver.com',
    // });

    // save(저장)
    // const user2 = await this.userRepository.save({
    //   email: 'seongbin9806@naver.com',
    // });

    // preload
    // 입력된 값을 기반으로 데티어베이스에 있는 데이터를 불러오고
    // 추가 입력된 값으로 데이터베이스에서 가져온 값들을 대처함.
    // 저장하지는 않음
    // id 101의 값의 이메일을 변경해서 불러옴

    // const user3 = await this.userRepository.preload({
    //   id: 101,
    //   email: 'seongbin9806@naver.com',
    // })

    // delete(삭제하기)
    // await this.userRepository.delete({
    //   id: 1,
    // });

    // 값을 증가시킨다.
    // 조건에 해당되는 모든 row에게 count 프로퍼티를 2만큼 증가 시킨다.
    // await this.userRepository.increment({
    //   id: 1,
    // }, 'count', 2);

    // 값을 감소시킴
    // 조건에 해당되는 모든 row에게 count 프로퍼티를 2만큼 감소 시킨다.
    // await this.userRepository.decrement({
    //   id: 1,
    // }, 'count', 2);

    // count
    // const count = await this.userRepository.count({
    //   where:{
    //     email: ILike('%0%'),
    //   },
    // })

    // sum
    // const sum = await this.userRepository.sum('count', {
    //   email: ILike('%0%'),
    // });

    // average
    // const average = await this.userRepository.average('count', {
    //   id: LessThan(4),
    // })

    // min
    // const min = await this.userRepository.minimum('count', {
    //   id: LessThan(4),
    // });

    // max
    // const max = await this.userRepository.maximum('count', {
    //   id: LessThan(4),
    // });

    const usersAndCount = await this.userRepository.findAndCount({
      take: 3,
    });

    return usersAndCount;
  }

  @Post('users')
  async postUser(){
    for(let i=0; i< 100; i++){
      await this.userRepository.save({
        email: `user-${i}@google.com`,
      })
    }
  }

  @Get('users')
  getUsers(){
    return this.userRepository.find({
      order:{
        id: 'ASC',
      },
      where: {
        // 아닌 경우 가져오기
        // id: Not(1),
        // 30보다 적은 경우 가져오기
        // id: LessThan(30),
        // 30보다 같거나 적은 경우 가져오기
        // id: LessThanOrEqual(30),
        // 30보다 큰 경우 가져오기
        // id: MoreThan(30),
        // 30보다 같거나 큰 경우 가져오기
        // id: MoreThanOrEqual(30),
        // 30과 같은 경우
        // id: Equal(30),
        // 유사값 - LIKE문
        // email: Like('%google%'),
        // 대문자 소문자 구분 안 하는 유사값
        // email: ILike('%GOOGLE%'),
        // 사이값
        // id: Between(10, 15),
        // 해당 되는 여러개의 값
        // id: In([1, 3, 5, 7, 99]),
        // 널인 경우
        // id: IsNull(),

      }
      // 어떤 프로퍼티를 시작할지
      // 기본은 모든 프로퍼티를 가져온다
      // 만약에 select를 정의하지 않으면
      // select를 정의하면 정의된 프로퍼티를 가져온다.
      // select: {
      //   id: true,
      //   createdAt: true,
      //   updateAt: true,
      //   version: true,
      //   profile:{
      //     id: true,
      //   }
      // },
      // AND - 필터링할 조건을 입력하게 된다.
      // where: {
        
      // },

      // OR - 필터링할 조건을 입력하게 된다.
      // where: [
      //   {
      //     id: 3
      //   },
      //   {
      //     version: 1
      //   }
      // ],
      // 관계를 가져오는법
      // relations:{
      //   profile: true,
      // },
      // // 오름차순(ASC), 내림차순(DESC)
      // order: {
      //   id: 'DESC',
      // },
      // // 처음 몇 개를 제외할지
      // skip: 0,
      // // 몇 개를 가져올지
      // take: 2,
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
      email: user.email + '0'
      // title: user.title + '0',
    });
  }

  @Post('user/profile')
  async createUserAndProfile(){
    const user = await this.userRepository.save({
      email: 'asdf@codefactory.ai',
      profile: {
        profileImg: 'asdf.jpg',
      }
    });

    // const profile = await this.profileRepository.save({
    //   profileImg: 'asdf.jpg',
    //   user,
    // });

    return user;
  }

  @Delete('user/profile/:id')
  async deleteProfile(
    @Param('id') id: string,
  ){
    await this.profileRepository.delete(+id);
  }

  @Post('user/post')
  async createUserAndPosts(){
    const user = await this.userRepository.save({
      email: 'postuser@codefactory.ai'
    });

    await this.postRepository.save({
      author: user,
      title: 'post 1'
    });

    await this.postRepository.save({
      author: user,
      title: 'post 2',
    });

    return user;
  }

  @Post('posts/tags')
  async createPostsTags(){
    const post1 = await this.postRepository.save({
      title: 'NestJS Lecture',
    });

    const post2 = await this.postRepository.save({
      title: 'Programming Lecture',
    });

    const tag1 = await this.tagRepository.save({
      name: 'Javascript',
      posts:[post1, post2],
    });

    const tag2 = await this.tagRepository.save({
      name: 'Typescript',
      posts:[post1],
    });

    const posts3 = await this.postRepository.save({
      title: 'NextJS Lecture',
      tags: [tag1, tag2],
    });

    return true;
  }

  @Get('posts')
  getPosts(){
    return this.postRepository.find({
      relations:{
        tags: true,
      }
    });
  }

  @Get('tags')
  getTags(){
    return this.tagRepository.find({
      relations:{
        posts: true,
      }
    });
  }
}
