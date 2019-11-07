import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RegisterComponent } from './register/register.component';
import { UsersRoutingModule } from './users-routing.module';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    UsersComponent
  ],
  imports: [
    SharedModule,
    UsersRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UsersModule { }
