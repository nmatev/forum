import { Injectable, Inject, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ForumPost } from '../data/entities/post';
import { Repository } from 'typeorm';
import { Comment } from '../data/entities/comments';
import { User } from '../data/entities/user';
import { ForumPostCreateDTO } from '../models/forum-post/forum-post-create-dto';
import { PostVoteModel } from '../data/entities/postvote';
import { VoteDTO } from '../models/forum-post/vote.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ForumPostService {

  constructor(
    @InjectRepository(ForumPost) private readonly forumPostRepo: Repository<ForumPost>,
    @InjectRepository(Comment) private readonly commentRepo: Repository<Comment>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(PostVoteModel) private readonly postVoteModelRepo: Repository<PostVoteModel>,
  ) { }

  async create(forumPost: ForumPostCreateDTO, user: User): Promise<ForumPost> {
    const createForumPost = new ForumPost();
    createForumPost.title = forumPost.title;
    createForumPost.text = forumPost.text;
    createForumPost.user = Promise.resolve(user);
    const author = user.id;
    const savedPost = await this.forumPostRepo.save(createForumPost);
    const saveNewPost = { ...savedPost, user: author };
    return await plainToClass(ForumPost, saveNewPost, { excludeExtraneousValues: true });
    return await this.forumPostRepo.save(createForumPost);
  }

  async getPosts(): Promise<ForumPost[]> {
    const allForumPosts = await this.forumPostRepo.find();
    const notDeletedPosts = allForumPosts.filter(notDeleted => {
      return notDeleted.isDeleted === false;
    });
    return notDeletedPosts;
  }

  async getPostbyId(postId: string): Promise<ForumPost> {
    const foundPost = await this.forumPostRepo.findOne(postId);
    const foundComments = await this.commentRepo.find({where: {post: postId}});
    let currentPostComments = await foundPost.comments;
    currentPostComments = foundComments;

    if (!foundPost || foundPost.isDeleted === true) {
      throw new NotFoundException('Post was not found');
    }
    return foundPost;
  }

  // public async getSinglePost(id: string): Promise<ShowPostDTO> {
  //   const foundPost = await this.commonService.findPostbyId(id);
  //   const convertedPost =  await this.converToShowPostDTO(foundPost);
  //   const comments: Comment[] = await foundPost.comments;

  //   convertedPost.comments = await Promise.all(
  //     comments.filter(comment => comment.isPublished === true)
  //     .map(async comment => {
  //         const convertedComment = {
  //           author: (await comment.author).username,
  //           content: comment.content,
  //           commentId: comment.commentId,
  //         };
  //         return convertedComment;
  //   }));

  //   return convertedPost;
  // }

  async deletePost(postId: string, user: User): Promise<ForumPostCreateDTO> {
    const deletedPost = await this.forumPostRepo.findOne({
      where: {
        id: postId,
      },
    });

    if (!deletedPost || deletedPost.isDeleted === true) {
      throw new NotFoundException('Post not found!');
    }
    const currentPostUser = await deletedPost.user;
    const currentLoggedUserId = user.id;
    deletedPost.isDeleted = true;

    if (currentPostUser.id !== currentLoggedUserId) {
      throw new BadRequestException('You can delete only your own posts!');
    }

    return await this.forumPostRepo.save(deletedPost);
  }

  async update(post: ForumPostCreateDTO, user: User, id: string): Promise<ForumPostCreateDTO> {
    const foundPost = await this.forumPostRepo.findOne(id);
    if (!foundPost || foundPost.isDeleted === true) {
      throw new NotFoundException('Post not found!');
    }

    const currentPostUser = await foundPost.user;
    const currentLoggedUserId = user.id;

    if (currentPostUser.id !== currentLoggedUserId) {
      throw new BadRequestException('You can update only your own posts!');
    }

    foundPost.text = post.text;
    foundPost.title = post.title;
    const updatePost = await this.forumPostRepo.save(foundPost);
    const updatedPost = await this.forumPostRepo.findOne(updatePost);
    return updatedPost;
  }

  async votes(postId: string, user: User, vote: VoteDTO): Promise<PostVoteModel> {
    const foundPost = await this.forumPostRepo.findOne(postId);
    const foundUser = await this.userRepo.findOne(user.id);
    const foundVote = await this.postVoteModelRepo.findOne({ where: { post: foundPost, userId: foundUser } });

    if (foundVote) {
      if (vote.vote === true) {
        foundVote.like = true;
        foundVote.dislike = false;
        return await this.postVoteModelRepo.save(foundVote);
      }
      if (vote.vote === false) {
        foundVote.like = false;
        foundVote.dislike = true;
        return await this.postVoteModelRepo.save(foundVote);
      }
      return await this.postVoteModelRepo.save(foundVote);
    }

    if (!foundVote) {
    // tslint:disable-next-line: new-parens
      const createNewVote = new PostVoteModel;
      createNewVote.userId = Promise.resolve(user);
      createNewVote.post = Promise.resolve(foundPost);
      if (vote.vote === true) {
        createNewVote.like = true;
        createNewVote.dislike = false;
        return await this.postVoteModelRepo.save(createNewVote);
      }
      if (vote.vote === false) {
        createNewVote.like = false;
        createNewVote.dislike = true;
        return await this.postVoteModelRepo.save(createNewVote);
      }
      return await this.postVoteModelRepo.save(createNewVote);
    }
  }
}
