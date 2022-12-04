import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ChangePasswordRequest, UpdateUserRequest, UsersService as UserApi } from 'src/app/sdk';
import { AuthService } from 'src/app/core/auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {

    constructor(
        private userApi: UserApi,
        private authService: AuthService,
    ) { }

    updateUser(userId: string, updateUserRequest: UpdateUserRequest): Observable<any> {
        return this.userApi.apiUsersIdPut(userId, updateUserRequest)
            .pipe(
                map((result) => {
                    this.authService.setUser(result);
                    return result;
                })
            );
    }

    changePassword(userId: string ,changePasswordRequest: ChangePasswordRequest): Observable<any> {
        return this.userApi.apiUsersIdPwresetPut(userId, changePasswordRequest);
    }

}
