import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { routes } from 'src/app/app-routing.module';
import { AdminModule } from '../admin.module';
import { AdminService } from '../admin.service';

import { AdminCaffListComponent } from './admin-caff-list.component';

describe('AdminCaffListComponent', () => {
  let component: AdminCaffListComponent;
  let fixture: ComponentFixture<AdminCaffListComponent>;
  let adminService: AdminService;
  let dialog: MatDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCaffListComponent ],
      imports: [
        NoopAnimationsModule,
        AdminModule,
        RouterTestingModule.withRoutes(routes)
      ],
      providers: [
        {
          provide: AdminService, useValue: {
            getUsers: () => of([]),
            getCaffs: () => of({}),
            deleteUser:(id: string) => of({}),
            addAdminRole: (id: string) => of({}),
            deleteCaff:(id: string) => of({}),
            editCaff: (id: string, {}) => of({}),
          }
        },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCaffListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    adminService = TestBed.inject(AdminService);
    fixture = TestBed.createComponent(AdminCaffListComponent);
    dialog = TestBed.inject(MatDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should edit a caff', () => {
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed : of({}), close: null });
    const spyObject = spyOn(dialog, 'open').and.returnValue(dialogRefSpyObj);
    component.editCaff({});
  });

  it('should delete a caff', () => {
    const spyFunction = spyOn(component, 'deleteCaff').and.callThrough();
    component.deleteCaff({});
    expect(spyFunction).toHaveBeenCalled();
  });
});
