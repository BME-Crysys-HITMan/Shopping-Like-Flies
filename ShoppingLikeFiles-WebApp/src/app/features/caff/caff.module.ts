import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CaffRoutingModule } from './caff-routing.module';
import { CaffListComponent } from './caff-list/caff-list.component';
import { CaffDetailsComponent } from './caff-details/caff-details.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterCaffDialogComponent } from './filter-caff-dialog/filter-caff-dialog.component';
import { CaffUploadDialogComponent } from './caff-upload-dialog/caff-upload-dialog.component';


@NgModule({
  declarations: [
    CaffListComponent,
    CaffDetailsComponent,
    FilterCaffDialogComponent,
    CaffUploadDialogComponent,
  ],
  imports: [
    CommonModule,
    CaffRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    NgxSpinnerModule,
  ]
})
export class CaffModule { }
