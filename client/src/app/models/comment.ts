import { User } from './user';
import { ForumPost } from './post';

export interface CommentOfPost {
  id: string;
  text: string;
  user: User;
  createdOn: string;
  updatedOn: string;
  comment: string;
  likes: number;
  post: ForumPost;
  isDeleted: boolean;
  showUpdateComment: boolean;
}
