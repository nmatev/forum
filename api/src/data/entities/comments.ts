import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user';
import { ForumPost } from './post';
@Entity('comment')
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ManyToOne(type => User, user => user.comments)
  user: Promise<User>;
  @Column('nvarchar')
  text: string;
  @CreateDateColumn()
  createdOn: Date;
  @UpdateDateColumn()
  updatedOn: Date;
  @ManyToOne(type => ForumPost, post => post.comments)
  post: Promise<ForumPost>;
  @Column({ default: false })
  isDeleted: boolean;
}
