import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/core/auth/auth.service';
import { CaffResponse, UserResponse } from 'src/app/sdk';
import { AdminService } from '../admin.service';
import { EditCaffDialogComponent } from '../edit-caff-dialog/edit-caff-dialog.component';

@Component({
    selector: 'app-admin-caff-list',
    templateUrl: './admin-caff-list.component.html',
    styleUrls: ['./admin-caff-list.component.scss']
})
export class AdminCaffListComponent implements OnInit {

    dataSource = new MatTableDataSource<CaffResponse>();
    displayedColumns = [
        'caption',
        'tags',
        'creator',
        'operations',
    ];
    caffs = [];

    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    adminUser: UserResponse;

    constructor(
        private adminService: AdminService,
        private spinner: NgxSpinnerService,
        private authService: AuthService,
        private dialog: MatDialog,
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
        this.adminService.getCaffs().subscribe({
            next: (caffs: CaffResponse[]) => {
                this.caffs = caffs,
                this.dataSource.data = this.caffs;
            },
            complete: () => {
                this.spinner.hide();
            },
            error: (err) => {
                // remove console log
                console.log(err);
                this.spinner.hide();
            },
        });
    }

    deleteCaff(caff: CaffResponse): void {
        this.spinner.show()
        this.adminService.deleteCaff(caff.id)
            .subscribe({
                next: () => this.reload(),
            });
    }

    editCaff(caff: CaffResponse): void {
        this.dialog.open(EditCaffDialogComponent, {
            width: '500px',
            panelClass: 'no-padding-dialog-container',
            autoFocus: true,
            data: caff,
        }).afterClosed().subscribe({
            next: (result) => {
                this.reload();
            },
        });
    }

}
