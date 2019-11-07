import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificatorService } from 'src/app/core/notificator.service';
import { AuthService } from 'src/app/core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {
  public isNavbarCollapsed = true;
  public isLoggedIn: boolean;
  public isLoggedInSubscription: Subscription;

  public constructor(
    private readonly authService: AuthService,
    private readonly notificator: NotificatorService,
    private readonly router: Router
  ) { }

  public ngOnInit(): void {
    this.isLoggedInSubscription = this.authService.isLoggedIn$.subscribe(isLogged => this.isLoggedIn = isLogged);
  }

  public ngOnDestroy(): void {
    this.isLoggedInSubscription.unsubscribe();
  }

  public logout(): void {
    this.authService.logout().subscribe(() => this.notificator.success('Successful logout')
    );
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 500);
  }
}
