import { Module } from '@nestjs/common';
import { ForumPostController } from './forum-post.controller';
import { ForumPostService } from './forum-post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ForumPost } from '../data/entities/post';
import { CoreModule } from '../core/core.module';
import { AuthModule } from '../auth/auth.module';
import { Comment } from '../data/entities/comments';
import { User } from '../data/entities/user';
import { PostVoteModel } from '../data/entities/postvote';
import { AddFriendsModule } from '../add-friends/add-friends.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../auth/strategy/jwt.strategy';
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
    AddFriendsModule,
    PassportModule,
  ],
  controllers: [ForumPostController],
  providers: [ForumPostService, JwtStrategy],
})
export class ForumPostModule { }
