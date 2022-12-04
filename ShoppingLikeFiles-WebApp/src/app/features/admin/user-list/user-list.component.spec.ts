import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { routes } from 'src/app/app-routing.module';
import { AdminModule } from '../admin.module';
import { AdminService } from '../admin.service';

import { UserListComponent } from './user-list.component';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let adminService: AdminService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserListComponent ],
      imports: [
        NoopAnimationsModule,
        AdminModule,
        RouterTestingModule.withRoutes(routes)
      ],
      providers: [
        {
          provide: AdminService, useValue: {
            getUsers: () => of([]),
            deleteUser:(id: string) => of({}),
            addAdminRole: (id: string) => of({}),
          }
        },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    adminService = TestBed.inject(AdminService);
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete the user', () => {
    const spyFunction = spyOn(component, 'deleteUser').and.callThrough();
    component.deleteUser({});
    expect(spyFunction).toHaveBeenCalled();
  });

  it('should buy the caff', () => {
    const spyFunction = spyOn(component, 'addAdminRole').and.callThrough();
    component.addAdminRole({});
    expect(spyFunction).toHaveBeenCalled();
  });
});
