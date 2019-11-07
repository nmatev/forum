import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ForumPost } from 'src/app/models/post';
import { CreatePost } from 'src/app/models/create-post';
import { User } from '../models/user';

@Injectable()
export class PostService {

  constructor(private readonly http: HttpClient) {}

  public getAllPosts(search?: string): Observable<ForumPost[]>{
    const url = search
      ? `http://localhost:3000/api/posts?search=${search}`
      : 'http://localhost:3000/api/posts';

    return this.http.get<ForumPost[]>(url);
  }

  public getPost(id: string): Observable<ForumPost> {
    return this.http.get<ForumPost>(`http://localhost:3000/api/${id}`);
  }

  public createPost(post: CreatePost): Observable<ForumPost>{
    return this.http.post<ForumPost>(`http://localhost:3000/api/posts`, post);
  }

  public updatePost(id: string, post: ForumPost): Observable<ForumPost>{
    return this.http.put<ForumPost>(`http://localhost:3000/api/${id}`, post);
  }

  public deletePost(id: string): Observable<ForumPost>{
    return this.http.delete<ForumPost>(`http://localhost:3000/api/${id}`);
  }

}

