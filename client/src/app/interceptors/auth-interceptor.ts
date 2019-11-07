import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../core/storage.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private readonly storage: StorageService) { }

    public intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const token = this.storage.getItem('token');

        const modifiedReq = request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
        return next.handle(modifiedReq);
    }
}
