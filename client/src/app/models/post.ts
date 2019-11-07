export interface ForumPost {
  id: string;
  title: string;
  text: string;
  user: string;
  createdOn: string;
  updatedOn: string;
  comment: string;
  likes: number;
  isDeleted: boolean;
}
