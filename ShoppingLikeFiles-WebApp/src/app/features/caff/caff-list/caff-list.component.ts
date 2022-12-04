import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BASE_URL } from 'src/app/base-urls';
import { AuthService } from 'src/app/core/auth/auth.service';
import { CaffAllResponse, CaffResponse, CaffSearchDTO, UserResponse } from 'src/app/sdk';
import { CaffUploadDialogComponent } from '../caff-upload-dialog/caff-upload-dialog.component';
import { CaffService } from '../caff.service';
import { FilterCaffDialogComponent } from '../filter-caff-dialog/filter-caff-dialog.component';

@Component({
    selector: 'app-caff-list',
    templateUrl: './caff-list.component.html',
    styleUrls: ['./caff-list.component.scss']
})
export class CaffListComponent implements OnInit {

    caffs: CaffAllResponse[] = [];
    // TODO: create typing for this
    fillterData = null;
    currentUser: UserResponse;

    constructor(
        private caffService: CaffService,
        private spinner: NgxSpinnerService,
        private router: Router,
        private dialog: MatDialog,
        private authService: AuthService,
    ) { }

    ngOnInit(): void {
        this.currentUser = this.authService.getUser();
        this.spinner.show();
        this.reload();
    }

    private reload(): void {
        this.spinner.show();
        this.caffService.getCaffs().subscribe({
            next: (caffs: CaffAllResponse[]) => {
                this.spinner.hide();
                this.caffs = caffs;
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

    private search(): void {
        this.spinner.show();
        const caffSearchDTO: CaffSearchDTO = {
        };
        if (this.fillterData.creator) {
            caffSearchDTO.creator = [this.fillterData.creator];
        }
        if (this.fillterData.caption) {
            caffSearchDTO.caption = [this.fillterData.caption];
        }
        if (this.fillterData?.tags?.length > 0) {
            caffSearchDTO.tags = this.fillterData.tags;
        }
        this.caffService.searchCaffs(caffSearchDTO).subscribe({
            next: (caffs: CaffResponse[]) => {
                this.spinner.hide();
                this.caffs = caffs;
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

    filter() {
        this.dialog.open(FilterCaffDialogComponent, {
            width: '500px',
            panelClass: 'no-padding-dialog-container',
            autoFocus: true,
            data: {filter: this.fillterData},
        }).afterClosed().subscribe({
            next: (result) => {
                this.fillterData = result;
                this.search();
            },
        });
    }

    addCaff() {
        this.dialog.open(CaffUploadDialogComponent, {
            width: '500px',
            panelClass: 'no-padding-dialog-container',
            autoFocus: true,
        }).afterClosed().subscribe({
            next: () => {

            },
        });
    }

    goToDetails(caff: CaffResponse): void {
        this.router.navigate(['/caff', caff.id.toString()]);
    }

}
