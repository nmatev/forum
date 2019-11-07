import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SpecificPostComponent } from './specific-post/specific-post.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { UpdatePostComponent } from './update-post/update-post.component';
import { CommentsOfPostComponent } from './comments-of-post/comments-of-post.component';

const routes: Routes = [
  { path: '', component: CreatePostComponent },
  { path: ':id', component: SpecificPostComponent },
  { path: ':id/comment', component: CommentsOfPostComponent },
  { path: ':id/updatepost', component: UpdatePostComponent },
]
  ;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostRoutingModule { }
