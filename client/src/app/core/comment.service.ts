import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ForumPost } from 'src/app/models/post';
import { CommentOfPost } from '../models/comment';
import { CreateComment } from '../models/create-comment';

@Injectable()

export class CommentService {

  constructor(private readonly http: HttpClient) { }

  public getCommentsOfThePost(postId: string): Observable<CommentOfPost[]> {
    return this.http.get<CommentOfPost[]>(`http://localhost:3000/api/post/${postId}`);
  }

  public getSpecificComment(id: string): Observable<ForumPost> {
    return this.http.get<ForumPost>(`http://localhost:3000/api/${id}`);
  }

  public createComment(comment: CreateComment, postId: string): Observable<CreateComment> {
    return this.http.post<CreateComment>(`http://localhost:3000/api/post/${postId}`, comment);
  }

  public updateComment(postId: string, comment: CommentOfPost, commentId: string): Observable<CommentOfPost> {
    return this.http.put<CommentOfPost>(`http://localhost:3000/api/post/${postId}/comment/${commentId}`, comment);
  }

  public deleteComment(postId: string, commentId: string): Observable<CommentOfPost> {
    return this.http.delete<CommentOfPost>(`http://localhost:3000/api/post/${postId}/comment/${commentId}`);
  }
}

