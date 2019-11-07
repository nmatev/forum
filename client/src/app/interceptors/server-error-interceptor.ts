import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NotificatorService } from '../core/notificator.service';

@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {

    constructor(
        private readonly router: Router,
        private readonly notificator: NotificatorService,
    ) { }

    public intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((error: any) => {
                if (error.status === 401) {
                    this.router.navigate(['/login']);
                    this.notificator.error(
                        'You should be logged-in in order to do this!'
                    );
                } else if (error.status === 403) {
                    this.router.navigate(['/home']);
                    this.notificator.error('You are not authorized to do this!');
                } else if (error.status === 404) {
                    this.router.navigate(['/not-found']);
                    this.notificator.error('Resource not found!');
                } else if (error.status >= 500) {
                    this.router.navigate(['/server-error']);
                    this.notificator.error('Oops.. something went wrong.. :(');
                }

                return throwError(error);
            })
        );
    }
}
