import { Column, CreateDateColumn, Entity, Generated, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import { ProfileModel } from "./profile.entity";
import { PostModel } from "./post.entity";

export enum Role{
    USER = 'user',
    ADMIN = 'admin',
}

@Entity()
export class UserModel{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;
    // @Column({
    //     // 데이터베이스에서 인지하는 칼럼 타입
    //     // 자동으로 유추됨
    //     type: 'varchar',

    //     // 데이터베이스 칼럼 이름
    //     // 프로퍼티 이름으로 자동 유추됨
    //     name: 'title',

    //     // 값의 길이
    //     // 입력 할 수 있는 글자의 길이가 300
    //     length: 300,

    //     // null이 가능한지
    //     nullable: true,
    //     update: true,

    //     // find()를 실행 할 때 기본으로 값을 불러올지
    //     // 기본값이 true
    //     select: false,

    //     // 아무것도 입력 안 했을 때 기본으로 입력되게 하는 값
    //     default: 'default value',

    //     // 칼럼 중에서 유일무이 한 값이 되어야하는지
    //     unique: false,
    // })
    // title: string;

    @Column({
        type: 'enum',
        enum: Role,
        default: Role.USER,    
    })
    role: Role;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @VersionColumn()
    version: number;

    @Column()
    @Generated('uuid')
    additionalId: string;

    @OneToOne(() => ProfileModel, (profile) => profile.user)
    @JoinColumn()
    profile: ProfileModel;

    @OneToMany(() => PostModel, (post) => post.author)
    posts: PostModel[];
}