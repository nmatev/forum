import { Component, OnInit, Input } from '@angular/core';
import { PostService } from '../../core/post.service';
import { SearchService } from 'src/app/core/search.service';
import { ForumPost } from 'src/app/models/post';
import { Subscription } from 'rxjs';
import { NotificatorService } from 'src/app/core/notificator.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  public posts: ForumPost[] = [];
  private searchSubscription: Subscription;
  @Input() public post: ForumPost;

  constructor(
    public readonly postService: PostService,
    public readonly searchService: SearchService,
    private notificator: NotificatorService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.postService
      .getAllPosts()
      .subscribe((data: ForumPost[]) => {
        this.posts = data;
        console.log(this.posts);
      });
  }


  public redirectToCreatePost(): void {
    this.router.navigate(['posts']);
  }

  public redirectToPostDetails(postId: string): void {
    this.router.navigate(['/posts', postId]);
  }


  // public showAllPost(): void {
  //     this.searchSubscription = this.searchService.search$.subscribe(
  //       (postName: string) => {
  //         this.postService
  //         .getAllPosts(postName)
  //         .subscribe((data: ForumPost[])=>{
  //           this.posts = data;
  //           console.log(this.posts);
  //         });
  //       }
  //     )
  //   }


  // public likePost(post: ForumPost): void {
  //   const likedPost = Object.assign({}, post);
  //   likedPost.likes++;

  //   this.postService
  //     .updatePost(likedPost.id, likedPost)
  //     .subscribe(updatedPost => {
  //       Object.assign(post, updatedPost);
  //     });
  // }

}
