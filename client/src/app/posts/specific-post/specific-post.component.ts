import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ForumPost } from 'src/app/models/post';
import { PostService } from 'src/app/core/post.service';
import { User } from 'src/app/models/user';
import { UsersDataService } from 'src/app/core/users-data.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './specific-post.component.html',
  styleUrls: ['./specific-post.component.css']
})

export class SpecificPostComponent implements OnInit {
  public currentPost: ForumPost;
  public routeParamsSubscription: Subscription;
  public allUsers: User[] = [];
  // public currentUser: User;

  constructor(
    public readonly activatedRoute: ActivatedRoute,
    public readonly postsDataServices: PostService,
    public readonly usersService: UsersDataService,
    private readonly router: Router
  ) { }

  public ngOnInit(): void {
    this.routeParamsSubscription = this.activatedRoute.params.subscribe(
      params => {
        this.postsDataServices.getPost(params.id).subscribe((data: ForumPost) => {
          this.currentPost = data;
        });
      }
    );
  }

  public redirectToPostUpdate(postId: string): void {
    this.router.navigate(['/posts', postId, 'updatepost']);
  }

  public redirectToComments(postId: string): void {
    this.router.navigate(['/posts', postId, 'comment']);
  }
}

