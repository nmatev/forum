import { Component, OnInit } from '@angular/core';
import { CommentService } from 'src/app/core/comment.service';
import { CommentOfPost } from 'src/app/models/comment';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificatorService } from 'src/app/core/notificator.service';
import { SearchService } from 'src/app/core/search.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({

  selector: 'app-comments-of-post',
  templateUrl: './comments-of-post.component.html',
  styleUrls: ['./comments-of-post.component.css']
})

export class CommentsOfPostComponent implements OnInit {

  public routeParamsSubscription: Subscription;
  public comments: CommentOfPost[] = [];
  private searchSubscription: Subscription;
  public updateCommentForm: FormGroup;
  public showButtonToUpdatePost = false;
  public publicId: string;

  constructor(
    public commentsService: CommentService,
    public readonly searchService: SearchService,
    public readonly activatedRoute: ActivatedRoute,
    public routeForTheId: ActivatedRoute,
    private router: Router,
    private readonly notificator: NotificatorService,
    private readonly formBuilder: FormBuilder,
  ) { }


  ngOnInit(): void {

    const id: string = this.routeForTheId.snapshot.paramMap.get('id');
    this.publicId = id;
    this.commentsService
      .getCommentsOfThePost(id)
      .subscribe(
        (data: CommentOfPost[]) => {
          this.comments = data;
        }
      );
  }


  removeThisComment(commentId: string): void {
    const postId: string = this.routeForTheId.snapshot.paramMap.get('id');

    this.commentsService
      .deleteComment(postId, commentId)
      .subscribe(
        () => {
          this.notificator.success('Successfully delete the comment!');
          this.router.navigateByUrl(`posts/${postId}`);
          this.ngOnInit();
        },
        () => {
          this.notificator.error('Forum Comment deletion failed');
        }
      );
  }


  public showUpdatePostButton(commentId: string): void {
    const foundComment = this.comments.filter(x => x.id === commentId)[0];

    if (foundComment != null) {
      foundComment.showUpdateComment = true;
    }
    if (foundComment.showUpdateComment === false) {
      this.ngOnInit();
    }
  }
}
