import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { CaffListComponent } from '../caff-list/caff-list.component';
import { CaffService } from '../caff.service';

@Component({
    selector: 'app-caff-upload-dialog',
    templateUrl: './caff-upload-dialog.component.html',
    styleUrls: ['./caff-upload-dialog.component.scss']
})
export class CaffUploadDialogComponent implements OnInit {

    fileName = '';

    file: File = null;

    constructor(
        private caffService: CaffService,
        public dialogRef: MatDialogRef<CaffListComponent>,
        private spinner: NgxSpinnerService
    ) { }

    ngOnInit(): void {
    }

    onChange(event): void {
        this.file = event.target.files[0];
        this.fileName = this.file.name;
    }

    upload() {
        if (this.file) {
            const formData = new FormData();
            formData.append('file', this.file);
            this.spinner.show();

            this.caffService.upload(formData).subscribe({
                next: () => {
                    this.spinner.show();
                    this.dialogRef.close(true);
                },
                error: (err) => console.log(err),
            })
        }
    }

}
