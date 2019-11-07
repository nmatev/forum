import { IsString, IsBoolean } from 'class-validator';
import { Comment } from '../../data/entities/comments';
import { ManyToOne, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ForumPost } from './post';
import { UseFilters } from '@nestjs/common';
import { User } from './user';
import { serialize } from 'class-transformer';

@Entity('PostVotes')
export class PostVoteModel {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @ManyToOne(type => ForumPost, post => post.votes)
    post: Promise<ForumPost>;
    @ManyToOne(type => User, userId => userId.postVotes)
    userId: Promise<User>;
    @Column()
    like: boolean;
    @Column()
    dislike: boolean;
}
