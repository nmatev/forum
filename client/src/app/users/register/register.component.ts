import { Component, OnInit } from '@angular/core';
import { UserRegister } from 'src/app/models/user-register';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/auth.service';
import { NotificatorService } from 'src/app/core/notificator.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;

  constructor(
    private readonly authServie: AuthService,
    private readonly notificator: NotificatorService,
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
  ) { }

  public ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}/)]],
    });
  }

  public register() {
    const user: UserRegister = this.registerForm.value;

    this.authServie.register(user).subscribe(
      () => {
        this.notificator.success('Successful register!');
        this.router.navigate(['/login']);
      },
      () => {
        this.notificator.error('Registartion failed');
      }
    );
  }
}
