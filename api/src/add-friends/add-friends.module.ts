import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ForumPost } from '../data/entities/post';
import { CoreModule } from '../core/core.module';
import { AuthModule } from '../auth/auth.module';
import { Comment } from '../data/entities/comments';
import { User } from '../data/entities/user';
import { PostVoteModel } from '../data/entities/postvote';
import { AddFriendsController } from './add-friends.controller';
import { AddFriendsService } from './add-friends.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ForumPost,
      Comment,
      User,
      PostVoteModel,
    ]),
    CoreModule,
    AuthModule,
  ],
  controllers: [AddFriendsController],
  providers: [AddFriendsService],
})
export class AddFriendsModule { }
