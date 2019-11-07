import { User } from '../../data/entities/user';
import { ForumPost } from '../../data/entities/post';
import { Expose } from 'class-transformer';

export class CommentShowDTO {
    @Expose()
    id: string;
    @Expose()
    user: Promise<User>;
    @Expose()
    text: string;
    @Expose()
    createdOn: Date;
    @Expose()
    updatedOn: Date;
    @Expose()
    post: Promise<ForumPost>;
    @Expose()
    isDeleted: boolean;
}
