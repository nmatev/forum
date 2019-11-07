import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from '../data/entities/comments';
import { CoreModule } from '../core/core.module';
import { AuthModule } from '../auth/auth.module';
import { CommentService } from './comment.service';
import { User } from '../data/entities/user';
import { CommentController } from './comment.controller';
import { AddFriendsModule } from '../add-friends/add-friends.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Comment,
            User,
        ]),
        CoreModule,
        AuthModule,
        AddFriendsModule,
    ],
    controllers: [CommentController],
    providers: [CommentService],
})
export class CommentModule { }
