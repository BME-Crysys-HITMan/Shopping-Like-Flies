import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CaffModule } from '../caff.module';

import { FilterCaffDialogComponent } from './filter-caff-dialog.component';

describe('FilterCaffDialogComponent', () => {
  let component: FilterCaffDialogComponent;
  let fixture: ComponentFixture<FilterCaffDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterCaffDialogComponent ],
      imports: [
        NoopAnimationsModule,
        CaffModule,
      ],
      providers: [
        {
          provide: MatDialogRef, useValue: {
            close: () => {}
          }
        },
        { provide: MAT_DIALOG_DATA, useValue: { creator: 'Teszt'} },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterCaffDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should remove a tag from filterform', () => {
    component.filterForm.patchValue({tags: ['Test']});
    const spyFunction = spyOn(component, 'remove').and.callThrough();
    component.remove('Test');

    expect(spyFunction).toHaveBeenCalled();
    expect(component.filterForm.value.tags.length).toEqual(0);

  });

  it('should add a tag to filterform', () => {
    const spyFunction = spyOn(component, 'add').and.callThrough();
    component.add({
      value: 'test',
      input: undefined,
      chipInput: {clear: () => {}} as any
    });

    expect(spyFunction).toHaveBeenCalled();
    expect(component.filterForm.value.tags.length).toEqual(1);
  });

  it('should close dialog with filterData', () => {
    component.filterForm.patchValue({creator: 'Test'});
    const spyFunction = spyOn(component, 'onSubmit').and.callThrough();
    component.onSubmit();

    expect(component.filterForm.value.creator).toEqual('Test');
    expect(spyFunction).toHaveBeenCalled();
  });
});
