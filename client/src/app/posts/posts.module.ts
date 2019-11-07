import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpecificPostComponent } from './specific-post/specific-post.component';
import { PostRoutingModule } from './posts-routing.module';
import { CreatePostComponent } from './create-post/create-post.component';
import { CreateCommentComponent } from './create-comment/create-comment.component';
import { UpdatePostComponent } from './update-post/update-post.component';
import { DeletePostComponent } from './delete-post/delete-post.component';
import { CommentsOfPostComponent } from './comments-of-post/comments-of-post.component';
import { UpdateCommentComponent } from './update-comment/update-comment.component';


@NgModule({
  declarations: [
    SpecificPostComponent,
    CreatePostComponent,
    CreateCommentComponent,
    UpdatePostComponent,
    DeletePostComponent,
    CommentsOfPostComponent,
    UpdateCommentComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    PostRoutingModule,
    ReactiveFormsModule,
  ],
  exports: [
    SpecificPostComponent,
    CreatePostComponent,
    CreateCommentComponent,
    UpdatePostComponent,
    DeletePostComponent,
    CommentsOfPostComponent
  ]
})
export class PostsModule { }
