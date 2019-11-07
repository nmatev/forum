import { Controller, Post, Body, ValidationPipe, Req, Put, Param, Get, UseGuards, HttpStatus, HttpCode, Delete } from '@nestjs/common';
import { ForumPost } from '../data/entities/post';
import { ForumPostService } from './forum-post.service';
import { ForumPostCreateDTO } from '../models/forum-post/forum-post-create-dto';
import { AuthGuard } from '@nestjs/passport';
import { VoteDTO } from '../models/forum-post/vote.dto';
import { PostVoteModel } from '../data/entities/postvote';

@Controller('api')
export class ForumPostController {

  constructor(
    private readonly forumPostService: ForumPostService,
  ) { }

  // Create
  @Post('/posts')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard())
  async create(@Body(new ValidationPipe({ whitelist: true, transform: true }))
  forumPost: ForumPostCreateDTO,
    // tslint:disable-next-line: align
    @Req() request: any,
  ): Promise<ForumPost> {
    console.log(forumPost);
    return await this.forumPostService.create(forumPost, request.user);
  }

  // Get All Posts
  @Get('/posts')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard())
  async index(): Promise<ForumPost[]> {
    return await this.forumPostService.getPosts();
  }

  // Get Specific Post
  @Get('/:id')
  @UseGuards(AuthGuard())
  @HttpCode(HttpStatus.OK)
  async getSpecificPost(@Param('id') id: string): Promise<ForumPostCreateDTO> {
    return await this.forumPostService.getPostbyId(id);
  }

  // Delete Post
  @Delete('/:id')
  @UseGuards(AuthGuard())
  async deletePost(@Param('id') id: string, @Req() request: any): Promise<ForumPostCreateDTO> {
    // const toBeDeletedPost = await this.forumPostService.getPostbyId(id);
    //  if(toBeDeletedPost.user !== request.user )
    return this.forumPostService.deletePost(id, request.user);
  }

  // Update Post
  @Put('/:id')
  @UseGuards(AuthGuard())
  async update(@Body(new ValidationPipe({ whitelist: true, transform: true }))
  // tslint:disable-next-line: no-shadowed-variable
  post: ForumPostCreateDTO,
    // tslint:disable-next-line: align
    @Req() request: any, @Param('id') id: string): Promise<ForumPostCreateDTO> {
    return await this.forumPostService.update(post, request.user, id);
  }

  @Put('/:id/votes')
  @UseGuards(AuthGuard())
  async votes(@Body(new ValidationPipe({ whitelist: true, transform: true }))
    vote: VoteDTO,
// tslint:disable-next-line: align
    @Param('id') id: string, @Req() request: any): Promise<PostVoteModel> {
    return await this.forumPostService.votes(id, request.user, vote);
  }
}
