import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { UpdateCaffRequest } from 'src/app/sdk';
import { AdminCaffListComponent } from '../admin-caff-list/admin-caff-list.component';
import { AdminService } from '../admin.service';

@Component({
    selector: 'app-edit-caff-dialog',
    templateUrl: './edit-caff-dialog.component.html',
    styleUrls: ['./edit-caff-dialog.component.scss']
})
export class EditCaffDialogComponent implements OnInit {

    editForm = this.fb.group({
        caption: [''],
        tags: [[]],
        input: [''],
    });

    @ViewChild('itemInput') itemInput: ElementRef<HTMLInputElement>;

    constructor(
        private fb: UntypedFormBuilder,
        public dialogRef: MatDialogRef<AdminCaffListComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
        private spinner: NgxSpinnerService,
        private adminService: AdminService
    ) { }

    ngOnInit(): void {
        this.editForm.setValue(
            {
                tags: this.data.tags || [],
                caption: this.data.caption || '',
                input: '',
            },
            { emitEvent: false },
        );
    }

    cancel(): void {
        this.dialogRef.close();
    }

    remove(tag: string): void {
        const index = this.editForm
            .get('tags')
            .value.indexOf(tag);
        if (index >= 0) {
            this.editForm.get('tags').value.splice(index, 1);
        }
    }

    onSubmit(): void {
        this.spinner.show();
        const updateCaffRequest: UpdateCaffRequest = {
            tags: this.editForm.get('tags').value,
            caption: this.editForm.get('caption').value,
        };

        this.adminService.editCaff(this.data.id, updateCaffRequest)
            .subscribe({
                next: (result) => {
                    this.dialogRef.close(result);
                },
                error: (err) => console.log(err), 
            })
        this.dialogRef.close(true);
    }

    add(event: MatChipInputEvent): void {
        const value = (event.value || '').trim();

        if (value) {
            this.editForm
                .get('tags')
                .value.push(value);
        }

        // Clear the input value
        event.chipInput!.clear();
    }

}
