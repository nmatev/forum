import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../data/entities/user';
import { ForumPost } from '../data/entities/post';
import { AddFriendsService } from '../add-friends/add-friends.service';
import { Comment } from '../data/entities/comments';
import { PostVoteModel } from '../data/entities/postvote';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, ForumPost, Comment, PostVoteModel]),
  ],
  providers: [UsersService],
  exports: [UsersService],
})
export class CoreModule {}
