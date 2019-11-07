import { NotificatorService } from './notificator.service';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { AuthService } from './auth.service';
import { StorageService } from './storage.service';
import { SearchService } from './search.service';
import { UsersDataService } from './users-data.service';
import { PostService } from './post.service';
import { CommentService } from './comment.service';
import { ToastrModule } from 'ngx-toastr';
@NgModule({
  providers: [
    NotificatorService,
    AuthService,
    StorageService,
    SearchService,
    UsersDataService,
    PostService,
    CommentService
  ],
  imports: [
    ToastrModule.forRoot(),
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parent: CoreModule) {
    if (parent) {
      throw new Error('Core module is already provided!');
    }
  }
}
