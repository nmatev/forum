import { User } from './user';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, CreateDateColumn, JoinColumn, UpdateDateColumn } from 'typeorm';
import { Comment } from './comments';
import { PostVoteModel } from './postvote';
import { Max } from 'class-validator';

@Entity('post')
export class ForumPost {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @ManyToOne(type => User, user => user.posts)
  user: Promise<User>;

  @CreateDateColumn()
  createdOn: Date;

  @UpdateDateColumn()
  updatedOn: Date;

  @Column('nvarchar')
  title: string;

  @Column('text')
  text: string;
  
  @OneToMany(type=> Comment, comments => comments.post)
  comments: Promise<Comment[]>;

  @Column({default: false})
  isDeleted: boolean;
  
  @OneToMany(type=> PostVoteModel, votes => votes.post)
  votes: Promise<PostVoteModel[]>;
}
