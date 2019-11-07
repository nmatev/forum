import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLogin } from 'src/app/models/user-login';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/auth.service';
import { NotificatorService } from 'src/app/core/notificator.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(
    private readonly authServie: AuthService,
    private readonly notificator: NotificatorService,
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
  ) { }

  public ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}/)]]
    });
  }

  public login() {
    const user: UserLogin = this.loginForm.value;

    this.authServie.login(user).subscribe(
      () => {
        this.notificator.success('Successful login');
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 1000);
      },
      () => {
        this.notificator.error('Lgoin failed');
      }
    );
  }
}
