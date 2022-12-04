import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { AdminModule } from '../admin.module';
import { AdminService } from '../admin.service';

import { EditCaffDialogComponent } from './edit-caff-dialog.component';

describe('EditCaffDialogComponent', () => {
  let component: EditCaffDialogComponent;
  let fixture: ComponentFixture<EditCaffDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCaffDialogComponent ],
      imports: [
        NoopAnimationsModule,
        AdminModule,
      ],
      providers: [
        {
          provide: MatDialogRef, useValue: {
            close: () => {}
          },
        },
        {
          provide: AdminService, useValue: {
            editCaff: (id: string, {}) => of({})
          }
        },
        { provide: MAT_DIALOG_DATA, useValue: { creator: 'Teszt', tags: [], caption:''} }
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCaffDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should remove a tag from filterform', () => {
    component.editForm.patchValue({tags: ['Test']});
    const spyFunction = spyOn(component, 'remove').and.callThrough();
    component.remove('Test');

    expect(spyFunction).toHaveBeenCalled();
    expect(component.editForm.value.tags.length).toEqual(0);

  });

  it('should add a tag to filterform', () => {
    const spyFunction = spyOn(component, 'add').and.callThrough();
    component.add({
      value: 'test',
      input: undefined,
      chipInput: {clear: () => {}} as any
    });

    expect(spyFunction).toHaveBeenCalled();
    expect(component.editForm.value.tags.length).toEqual(1);
  });


  it('should add a tag to filterform', () => {
    const spyFunction = spyOn(component, 'onSubmit').and.callThrough();
    component.onSubmit();
    expect(spyFunction).toHaveBeenCalled();
  });

  it('should close', () => {
    const spyFunction = spyOn(component, 'cancel').and.callThrough();
    component.cancel();
    expect(spyFunction).toHaveBeenCalled();
  });
});
