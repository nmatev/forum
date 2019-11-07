import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { StorageService } from '../core/storage.service';

@Injectable({
    providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

    constructor(
        private readonly storageService: StorageService,
    ) { }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler,
    ) {
        const token = this.storageService.getItem('token') || '';
        const updatedRequest = request.clone({
            headers: request.headers.set('Authorization', `Bearer ${token}`)
        });

        return next.handle(updatedRequest);
    }
}
