import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommentOfPost } from 'src/app/models/comment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommentService } from 'src/app/core/comment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificatorService } from 'src/app/core/notificator.service';
import { PostService } from 'src/app/core/post.service';
import { ForumPost } from 'src/app/models/post';

@Component({
  selector: 'app-update-comment',
  templateUrl: './update-comment.component.html',
  styleUrls: ['./update-comment.component.css']
})
export class UpdateCommentComponent implements OnInit {

  public currentPost: ForumPost;
  public updateCommentForm: FormGroup;
  public comments: CommentOfPost[] = [];
  public routeParamsSubscription: Subscription;
  @Input() comment: CommentOfPost;

  constructor(
    public commentsService: CommentService,
    public routeForTheId: ActivatedRoute,
    private router: Router,
    private readonly notificator: NotificatorService,
    private readonly formBuilder: FormBuilder,
    public postsDataServices: PostService,
  ) { }

  public ngOnInit(): void {
    this.updateCommentForm = this.formBuilder.group({
      text: ['', [Validators.required]]
    });
  }

  public refreshPage(): void {
    this.routeParamsSubscription = this.routeForTheId.params.subscribe(
      params => {
        this.postsDataServices.getPost(params.id).subscribe((data: ForumPost) => {
          this.currentPost = data;
        });
      });
  }


  public saveYourUpdatePost(): void {

    const updateComment: CommentOfPost = this.updateCommentForm.value;

    const postId: string = this.routeForTheId.snapshot.paramMap.get('id');

    this.commentsService.updateComment(postId, updateComment, this.comment.id).subscribe(
      () => {
        this.notificator.success(`Succesfully updated your comment`);
        this.router.navigate([`posts/${postId}/comment`]);
        this.refreshPage();
      },
      () => {
        this.notificator.error(`Your comment update failed`);
      }
    );
  }

  public hideUpdatePostText(commentId: string): void {
    if (this.comment.id === commentId) {
      this.comment.showUpdateComment = false;
    }
  }
}
