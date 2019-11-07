import { Component } from '@angular/core';
import { CreatePost } from 'src/app/models/create-post';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostService } from 'src/app/core/post.service';
import { NotificatorService } from 'src/app/core/notificator.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {
  public createPostForm: FormGroup;

  constructor(
    private readonly postService: PostService,
    private readonly notificator: NotificatorService,
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
  ) { }

  public ngOnInit() {
    this.createPostForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      text: ['', [Validators.required]]
    });
  }

  public createPost() {
    const createPost: CreatePost = this.createPostForm.value;

    this.postService.createPost(createPost).subscribe(
      () => {
        this.notificator.success('Successfully created a post!');
        this.router.navigate(['/home']);
      },
      () => {
        this.notificator.error('ForumPost creation failed');
      }
    );
  }
}
