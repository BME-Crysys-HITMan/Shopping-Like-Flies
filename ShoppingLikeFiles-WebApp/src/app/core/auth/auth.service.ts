import { Injectable, OnDestroy } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserResponse } from 'src/app/sdk';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private token: string;
    private user: UserResponse;

    constructor(
        private cookieService: CookieService,
    ) {
        const user = this.cookieService.get('user');
        if (user) {
            this.user = JSON.parse(user);
        }
        this.token = this.cookieService.get('token');
    }

    clear() {
        this.user = null;
        this.token = '';
        this.cookieService.delete('token', '/');
        this.cookieService.delete('user', '/');
    }

    getAccessToken(): string {
        return this.token ? this.token : '';
    }

    getUser(): UserResponse {
        return this.user;
    }

    setAccessToken(token: string) {
        this.token = token;
        this.cookieService.set('token', this.token, { path: '/' });
    }

    setUser(user: UserResponse) {
        this.user = user;
        this.cookieService.set('user', JSON.stringify(user), { path: '/' });
    }
}
