import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import { LoginRequest, LoginResponse, LoginService as LoginApi, RegisterRequest, RegisterService as RegisterApi } from 'src/app/sdk';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor(
        private authService: AuthService,
        private loginApi: LoginApi,
        private registerApi: RegisterApi,
    ) { }

    login(loginRequest: LoginRequest): Observable<LoginResponse> {
        return this.loginApi.apiLoginPost(loginRequest)
        .pipe(
            map((result) => {
                if (result.accessToken) {
                    this.authService.setAccessToken(result.accessToken);
                    this.authService.setUser({
                        id: result.id,
                        isAdmin: result.isAdmin,
                        username: result.username,
                        firstname: result.firstname,
                        lastname: result.lastname
                    });
                } else {
                    this.authService.clear();
                    throw Error('Access denied');
                }
                return {
                    id: result.id,
                    isAdmin: result.isAdmin,
                    username: result.username,
                    firstname: result.firstname,
                    lastname: result.lastname
                };
            }),
        );;
    }

    logout(): Observable<any> {
        return this.loginApi.apiLoginDelete()
        .pipe(
            map(() => {
                this.authService.clear();
            }),
        );
    }

    register(registerRequest: RegisterRequest): Observable<any> {
        return this.registerApi.apiRegisterPost(registerRequest);
    }
}
