import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CaffListComponent } from '../caff-list/caff-list.component';

@Component({
    selector: 'app-filter-caff-dialog',
    templateUrl: './filter-caff-dialog.component.html',
    styleUrls: ['./filter-caff-dialog.component.scss']
})
export class FilterCaffDialogComponent implements OnInit {
    filterForm = this.fb.group({
        creator: [''],
        caption: [''],
        tags: [[]],
        input: [''],
    });

    @ViewChild('itemInput') itemInput: ElementRef<HTMLInputElement>;

    constructor(
        private fb: UntypedFormBuilder,
        public dialogRef: MatDialogRef<CaffListComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
    ) { }

    ngOnInit(): void {
        if (this.data.filter != null) {
            this.filterForm.setValue(
                {
                    tags: this.data.filter.tags || [],
                    caption: this.data.filter.caption || '',
                    creator: this.data.filter.creator || '',
                    input: '',

                },
                { emitEvent: false },
            );
        }
    }

    cancel(): void {
        this.dialogRef.close();
    }

    remove(tag: string): void{
        const index = this.filterForm
            .get('tags')
            .value.indexOf(tag);
        if (index >= 0) {
            this.filterForm.get('tags').value.splice(index, 1);
        }
    }

    onSubmit(): void {
        const filter = {
            tags: this.filterForm.get('tags').value,
            creator: this.filterForm.get('creator').value,
            caption: this.filterForm.get('caption').value,
        }
        this.dialogRef.close(filter);
    }

    add(event: MatChipInputEvent): void {
        const value = (event.value || '').trim();

        if (value) {
            this.filterForm
            .get('tags')
            .value.push(value);
        }
    
        // Clear the input value
        event.chipInput!.clear();
      }

}
