import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NotificatorService } from './core/notificator.service';
import { AuthService } from './core/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'client';
  public username: string;
}
