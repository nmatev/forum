import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/core/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificatorService } from 'src/app/core/notificator.service';

@Component({
  selector: 'app-delete-post',
  templateUrl: './delete-post.component.html',
  styleUrls: ['./delete-post.component.css']
})
export class DeletePostComponent {

  constructor(
    public readonly postService: PostService,
    private routeForTheId: ActivatedRoute,
    private readonly notificator: NotificatorService,
    private readonly router: Router,
  ) { }


  removeForumPost() {
    const id: string = this.routeForTheId.snapshot.paramMap.get('id');

    this.postService
      .deletePost(id)
      .subscribe(
        () => {
          this.notificator.success('Successfully delete the post!');
          this.router.navigateByUrl(`home`);
        },
        () => {
          this.notificator.error('ForumPost deletion failed');
        }
      );
  }
}
