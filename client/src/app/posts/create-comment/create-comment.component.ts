import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommentService } from 'src/app/core/comment.service';
import { NotificatorService } from 'src/app/core/notificator.service';
import { Router } from '@angular/router';
import { CreateComment } from 'src/app/models/create-comment';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/core/post.service';
import { CommentOfPost } from 'src/app/models/comment';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.css']
})
export class CreateCommentComponent implements OnInit {

  public createCommentForm: FormGroup;
  public comments: CommentOfPost[] = [];

  constructor(
    private readonly commentService: CommentService,
    private readonly notificator: NotificatorService,
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private routeForTheId: ActivatedRoute,
    private postService: PostService
  ) { }

  public ngOnInit() {
    this.createCommentForm = this.formBuilder.group({
      text: ['', [Validators.required]]
    });
  }

  public refreshPage(): void {

    const id: string = this.routeForTheId.snapshot.paramMap.get('id');

    this.commentService
      .getCommentsOfThePost(id)
      .subscribe(
        (data: CommentOfPost[]) => {
          this.comments = data;
        }
      );
  }


  public createComment() {

    const createComment: CreateComment = this.createCommentForm.value;

    const id: string = this.routeForTheId.snapshot.paramMap.get('id');

    this.commentService.createComment(createComment, id).subscribe(
      () => {
        this.notificator.success('Successfully created a comment!');
        this.router.navigateByUrl(`posts/${id}/comment`);
        this.refreshPage();
        // this.router.navigateByUrl(`/posts/${id}`); // home
      },
      () => {
        this.notificator.error('ForumComment creation failed');
      });
  }

}
