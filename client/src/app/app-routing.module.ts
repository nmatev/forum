import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { NgModule } from '@angular/core';
import { ServerErrorComponent } from './components/server-error/server-error.component';
import { NotFoundComponent } from './components/server-error/not-found/not-found.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './users/login/login.component';
import { RegisterComponent } from './users/register/register.component';
import { PostsComponent } from './posts/posts/posts.component';
import { UsersComponent } from './components/users/users.component';


const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: PostsComponent, canActivate: [AuthGuard] },
    { path: 'register', component: RegisterComponent },
    { path: 'posts', loadChildren: './posts/posts.module#PostsModule'},
    { path: 'users', component: UsersComponent },
    { path: 'server-error', component: ServerErrorComponent },
    { path: 'not-found', component: NotFoundComponent },
    { path: '**', redirectTo: '/not-found' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
