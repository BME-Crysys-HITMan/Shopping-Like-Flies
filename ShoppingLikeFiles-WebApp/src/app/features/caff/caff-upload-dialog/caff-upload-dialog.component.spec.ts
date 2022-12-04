import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { CaffModule } from '../caff.module';
import { CaffService } from '../caff.service';

import { CaffUploadDialogComponent } from './caff-upload-dialog.component';

describe('CaffUploadDialogComponent', () => {
  let component: CaffUploadDialogComponent;
  let fixture: ComponentFixture<CaffUploadDialogComponent>;
  let caffService: CaffService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaffUploadDialogComponent ],
      imports: [
        NoopAnimationsModule,
        CaffModule,
      ],
      providers: [
        {
          provide: MatDialogRef, useValue: {
            close: () => {}
          },
        },
        {
          provide: CaffService, useValue: {
            upload: () => of({})
          }
        },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaffUploadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should upload', () => {
    const spyFunction = spyOn(component, 'upload').and.callThrough();
    component.upload();

    expect(spyFunction).toHaveBeenCalled();
  });
});
