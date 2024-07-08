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

    @OneToOne(() => ProfileModel, (profile) => profile.user, {
        // find() 실행 할 때마다 항상 같이 가져올 releation
        eager: false,
        // 저장할 때 releation을 한 번에 같이 저장가능
        cascade: true,
        // null이 가능한지
        nullable: true,
        // 관계가 삭제 됐을 때
        // no action -> 아무 것도 안함
        // cascade -> 참조하는 Row도 같이 삭제
        // set null -> 참조하는 Row에서 참조 id를 null로 변경
        // set default -> 기본 세팅으로 설정 (테이블의 기본 세팅)
        // restrict -> 참조 하고 있는 Row가 있는 경우 참조당하는 Row 삭제불가
        onDelete: 'RESTRICT',
    })
    @JoinColumn()
    profile: ProfileModel;

    @OneToMany(() => PostModel, (post) => post.author)
    posts: PostModel[];

    @Column({
        default: 0,
    })
    count: number;
}