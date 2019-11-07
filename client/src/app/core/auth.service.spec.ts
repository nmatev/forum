import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { StorageService } from './storage.service';
import { UserLogin } from '../models/user-login';
import { of } from 'rxjs';

describe('AuthService', () => {
    const http = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    const storage = jasmine.createSpyObj('StorajeService', ['removeItem', 'setItem', 'getItem']);
    const user: UserLogin = {
        email: 'test',
        password: 'test',
    };

    beforeEach(() => TestBed.configureTestingModule({
        providers: [
            {
                provide: HttpClient,
                useValue: http,
            },
            {
                provide: StorageService,
                useValue: storage,
            }
        ]
    }));

    it('should be created', () => {
        const service: AuthService = TestBed.get(AuthService);
        expect(service).toBeTruthy();
    });

    it('login should log the user in', () => {
        http.post.and.returnValue(of({
            token: 'token',
            user: {
                name: 'test',
            },
        }));
        const service: AuthService = TestBed.get(AuthService);
        service.login(user).subscribe((res) => {
            expect(res.user.name).toBe('test');
        });
    });

    it('login should call auth.pos', () => {
        const service: AuthService = TestBed.get(AuthService);
        http.post.calls.reset();
        service.login(user).subscribe(() => expect(http.post).toHaveBeenCalledTimes(1)
        );
    });

    it('login should log the user in', () => {
        http.post.and.returnValue(of({
            token: 'token',
            user: {
                name: 'test',
            },
        }));
        const service: AuthService = TestBed.get(AuthService);
        service.login(user).subscribe(() => {
            service.user$.subscribe((token) => expect(token).toBe(null));
        });
    });
});
