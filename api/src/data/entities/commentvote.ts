// import { IsString, IsBoolean } from 'class-validator';
// import { Comment } from '../../data/entities/comments';
// import { ManyToOne, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
// import { User } from './user';

// @Entity('CommentVotes')
// export class CommentVoteModel {
//     @PrimaryGeneratedColumn('uuid')
//     id: string;
//     @ManyToOne(type => Comment, comment => comment.votes)
//     comment: Promise<Comment>;
//     @ManyToOne(type => User, userId => userId.commetVotes)
//     userId: Promise<User>;
//     @Column()
//     like: boolean;
//     @Column()
//     dislike: boolean;
// }
