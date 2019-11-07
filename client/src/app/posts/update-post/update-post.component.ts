import { Component, OnInit } from '@angular/core';
import { NotificatorService } from 'src/app/core/notificator.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ForumPost } from 'src/app/models/post';
import { PostService } from 'src/app/core/post.service';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.css']
})
export class UpdatePostComponent implements OnInit {
  public updatePostForm: FormGroup;
  
  constructor(
    private readonly notificator: NotificatorService,
    private readonly router: Router,
    private routeForTheId: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    public readonly postsDataServices: PostService
  ) { }

  public ngOnInit() {
    this.updatePostForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      text: ['', [Validators.required]]
    });
  }


  public updateCurrentPost(): void {

    const updatePost: ForumPost = this.updatePostForm.value;
    
    const id: string = this.routeForTheId.snapshot.paramMap.get('id');

    this.postsDataServices.updatePost(id, updatePost).subscribe(
      ()=> {
        this.notificator.success('Successfully update a post!');
        this.router.navigateByUrl(`posts/${id}`);
      },
      () => {
        this.notificator.error('ForumPost update failed');
      }
    );
  }
}
