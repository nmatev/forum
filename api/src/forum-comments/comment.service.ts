import { Injectable, NotFoundException, BadRequestException, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../data/entities/comments';
import { User } from '../data/entities/user';
import { CommentCreateDTO } from '../models/comment/comment-create-dto';
import { plainToClass } from 'class-transformer';
import { CommentShowDTO } from '../models/comment/comment-show-dto';
import { CommentUpdateDTO } from '../models/comment/comment-update-dto';
import { ForumPost } from '../data/entities/post';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment) private readonly commentRepo: Repository<Comment>,
        @InjectRepository(User) private readonly userRepo: Repository<User>,
        // @InjectRepository(Post) priate readonly postRepo: Repository<Post>
    ) { }

    // Create Comment

    public async create(comment: CommentCreateDTO, user: User, postId: ForumPost): Promise<CommentShowDTO> {
        const createComment: Comment = await this.commentRepo.create(comment);
        createComment.user = Promise.resolve(user);
        createComment.post = Promise.resolve(postId);
        const author = user.name;
        const savedComment = await this.commentRepo.save(createComment);
        return await this.commentRepo.save(savedComment);
        const sevNewComment = { ...savedComment, user: author, post: postId }; // posts - za postovete
        return await plainToClass(CommentShowDTO, sevNewComment, { excludeExtraneousValues: true });
    }

    // Cet Comment

    async getCommentByID(commentID: string): Promise<CommentShowDTO> {
        const foundComment = await this.commentRepo.findOne(commentID);
        if (!foundComment || foundComment.isDeleted === true) {
            throw new NotFoundException('Post was not found');
        }
        return foundComment;
    }


    // Get All Comments of Single Post

    async getAllCommentsOfPost(postId: string): Promise<CommentShowDTO[]>{
        const allCommentsOfCurrentPost = await this.commentRepo.find(
            {where: {post: postId}}
        );

        const notDeleteComments = allCommentsOfCurrentPost.filter(notDeleted => {
            return notDeleted.isDeleted === false;
          });
          
        return await notDeleteComments;
    }

    // Update Comment

    public async update(comment: CommentUpdateDTO, user: User, id: string): Promise<CommentShowDTO> {
        const foundComment = await this.commentRepo.findOne(id);
        foundComment.text = comment.text;
        const updateComment: Comment = await this.commentRepo.save(foundComment);
        const updatedComment = await this.commentRepo.findOne(updateComment);
        return updatedComment;
    }

    // Delete Comment
    async deleteComment(commentID: string, user: User): Promise<CommentCreateDTO> {
        const deleteComment = await this.commentRepo.findOne({ 
            where: { 
                id: commentID, 
                isDeleted: false,
                user: user.id  
            } });
        if (!deleteComment) { throw new Error('Sorry Mario, comment not found!'); }
        const currentCommentUser = await deleteComment.user;
        const currentLoggedUserId = user.id;
        deleteComment.isDeleted = false;
        if (currentCommentUser.id !== currentLoggedUserId) {
            throw new BadRequestException(`Comment with ID ${commentID} not found`);
            // throw new Error('You can delete only your own posts!');
        }
        deleteComment.isDeleted = true;
        return await this.commentRepo.save(deleteComment);
    }
}
