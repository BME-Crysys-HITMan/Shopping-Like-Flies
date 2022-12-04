import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/core/auth/auth.service';
import { UserResponse } from 'src/app/sdk';
import { AdminService } from '../admin.service';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

    dataSource = new MatTableDataSource<UserResponse>();
    displayedColumns = [
        'username',
        'firstname',
        'lastname',
        'admin',
        'operations',
    ];
    users = [];

    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    adminUser: UserResponse;

    constructor(
        private adminService: AdminService,
        private spinner: NgxSpinnerService,
        private authService: AuthService,
    ) { }

    ngOnInit(): void {
        this.adminUser = this.authService.getUser();
        this.paginator.pageSize = 25;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort
        this.reload();
    }

    private reload(): void {
        this.spinner.show();
        this.adminService.getUsers().subscribe({
            next: (users: UserResponse[]) => {
                this.users = users,
                    this.dataSource.data = this.users;
            },
            complete: () => {
                this.spinner.hide();
            },
            error: (err) => {
                console.log(err);
                this.spinner.hide();
            },
        });
    }

    deleteUser(user: UserResponse): void {
        this.adminService.deleteUser(user.id)
            .subscribe({
                next: () => this.reload(),
            });
    }

    addAdminRole(user: UserResponse): void {
        this.adminService.addAdminRole(user.id)
            .subscribe({
                next: () => this.reload(),
            });
    }

}
