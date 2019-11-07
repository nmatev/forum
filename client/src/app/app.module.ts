import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { PostsComponent } from './posts/posts/posts.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { SpecificPostComponent } from './posts/specific-post/specific-post.component';
import { CreatePostComponent } from './posts/create-post/create-post.component';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClient } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/auth-interceptor';
import { ServerErrorInterceptor } from './interceptors/server-error-interceptor';
import { ServerErrorComponent } from './components/server-error/server-error.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/server-error/not-found/not-found.component';
import { UsersModule } from './users/users.module';
import { CreateCommentComponent } from './posts/create-comment/create-comment.component';
import { UpdatePostComponent } from './posts/update-post/update-post.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { PostsModule } from './posts/posts.module';
import { UsersComponent } from './components/users/users.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ServerErrorComponent,
    NotFoundComponent,
    PostsComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    FormsModule,
    SharedModule,
    AppRoutingModule,
    ReactiveFormsModule,
    UsersModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    {
    provide: HTTP_INTERCEPTORS,
    useClass: ServerErrorInterceptor,
    multi: true,
  },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
