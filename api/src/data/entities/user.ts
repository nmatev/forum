import { Entity, PrimaryGeneratedColumn, Column, JoinTable, ManyToMany, CreateDateColumn, JoinColumn, OneToMany, VersionColumn } from 'typeorm';
import { Role } from './role';
import { ForumPost } from './post';
import { Comment } from './comments';
import { PostVoteModel } from './postvote';
import { Blacklist } from './blacklist';
import { UserRole } from '../../common/enums/user-role.enum';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('nvarchar')
    name: string;

    @Column('nvarchar')
    password: string;

    @Column({ unique: true })
    email: string;

    @JoinTable()
    @ManyToMany(type => User, user => user.friended)
    friended: Promise<User[]>;

    @ManyToMany(type => User, user => user.beFriendedBy)
    beFriendedBy: Promise<User[]>;

    @JoinTable()
    @ManyToMany(type => Role, { eager: true })
    roles: Role[];

    @CreateDateColumn()
    createdOn: Date;

    @OneToMany(type => ForumPost, post => post.user)
    posts: Promise<ForumPost[]>;

    @OneToMany(type => Comment, comment => comment.user)
    comments: Promise<Comment[]>;

    @VersionColumn()
    version: number;

    @OneToMany(type => PostVoteModel, postvotes => postvotes.userId)
    postVotes: Promise<PostVoteModel[]>;

    @Column({ nullable: true })
    isDeleted: boolean;

    @Column({ nullable: true })
    isBanned: boolean;

    @OneToMany(type => Blacklist, blacklist => blacklist.user)
    blacklist: Promise<Blacklist[]>;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.USER,
    })
    preveleges: UserRole;
}
