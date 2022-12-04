import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UsersService as UserApi, CaffService as CaffApi, UserResponse, CaffResponse, UpdateCaffRequest } from 'src/app/sdk';

@Injectable({
    providedIn: 'root'
})
export class AdminService {

    constructor(
        private userApi: UserApi,
        private caffApi: CaffApi,
    ) { }

    getUsers(): Observable<UserResponse[]> {
        // return of([{ id: '234', username: 'username', firstname: 'firstname', lastname: 'lastname', isAdmin: false }]);
        return this.userApi.apiUsersGet();
    }

    getCaffs(): Observable<CaffResponse[]> {
        // return of([{ id: '234', creator: 'username', caption: 'firstname', tags: ['lastname'] }]);
        return this.caffApi.apiCaffGet();
    }

    deleteUser(userId: string): Observable<any> {
        return this.userApi.apiUsersIdDelete(userId);
    }

    addAdminRole(userId: string): Observable<any> {
        return this.userApi.apiUsersIdAdminPut(userId);
    }

    deleteCaff(caffId: number): Observable<any> {
        return this.caffApi.apiCaffIdDelete(caffId);
    }

    editCaff(id: number, updateCaffRequest: UpdateCaffRequest): Observable<any> {
        return this.caffApi.apiCaffIdPut(id, updateCaffRequest);
    }
}
