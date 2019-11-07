import { Controller, UseGuards, Post, Body, ValidationPipe, Req, Put, Param, Delete, HttpCode, HttpStatus, Get } from '@nestjs/common';
import { CommentService } from './comment.service';
import { AuthGuard } from '@nestjs/passport';
import { Comment } from '../data/entities/comments';
import { CommentCreateDTO } from '../models/comment/comment-create-dto';
import { CommentUpdateDTO } from '../models/comment/comment-update-dto';
import { CommentShowDTO } from '../models/comment/comment-show-dto';
import { ForumPost } from '../data/entities/post';

@Controller('api/post')
export class CommentController {
    constructor(private readonly commentService: CommentService) { }

    // Create Comment

    @UseGuards(AuthGuard())
    @Post(':postId')
    @HttpCode(HttpStatus.CREATED)
    async create(@Body(new ValidationPipe({ whitelist: true, transform: true }))
    // tslint:disable-next-line: no-shadowed-variable
    Comment: CommentCreateDTO,
        // tslint:disable-next-line: align
        @Req() request: any, @Param('postId') postId: ForumPost): Promise<Comment> {
        return await this.commentService.create(Comment, request.user, postId);
    }

    // Update Comment

    @UseGuards(AuthGuard())
    @Put(':postID/comment/:commentID')
    @HttpCode(HttpStatus.OK)
    async update(@Body(new ValidationPipe({ whitelist: true, transform: true }))
    // tslint:disable-next-line: no-shadowed-variable
    Comment: CommentUpdateDTO,
        // tslint:disable-next-line: align
        @Req() request: any, @Param('commentID') id: string): Promise<Comment> {
        return await this.commentService.update(Comment, request.user, id);
    }

    // GET ALL COMMENTS OF POST

    @UseGuards(AuthGuard())
    @Get(':postId')
    // @Get(':postID/comment/:commentID')
    @HttpCode(HttpStatus.OK)
    async getAllCommentsOfSinglePost(@Param('postId') id: string): Promise<CommentShowDTO[]> {
        const allCommentsOfPost = await this.commentService.getAllCommentsOfPost(id);
        return await allCommentsOfPost;
    }


    // Get Specific Comment

    @UseGuards(AuthGuard())
    @Get(':postID/comment/:commentId')
    // @Get(':postID/comment/:commentID')
    @HttpCode(HttpStatus.OK)
    async getSpecificComment(@Param('commentId') id: string): Promise<CommentCreateDTO> {
        const specificComment = await this.commentService.getCommentByID(id);
        return await specificComment;
    }

    // Delete Comment

    @Delete(':postID/comment/:commentID')
    @UseGuards(AuthGuard())
    @HttpCode(HttpStatus.OK)
    async deleteComment(@Param('commentID') id: string, @Req() request: any): Promise<CommentCreateDTO> {
        console.log(id);
        
        return this.commentService.deleteComment(id, request.user);
    }
}
