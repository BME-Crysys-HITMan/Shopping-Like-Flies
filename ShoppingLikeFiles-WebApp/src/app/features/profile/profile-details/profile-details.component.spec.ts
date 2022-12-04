import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { routes } from 'src/app/app-routing.module';
import { AuthService } from 'src/app/core/auth/auth.service';
import { ProfileModule } from '../profile.module';
import { ProfileService } from '../profile.service';

import { ProfileDetailsComponent } from './profile-details.component';

describe('ProfileDetailsComponent', () => {
  let component: ProfileDetailsComponent;
  let fixture: ComponentFixture<ProfileDetailsComponent>;
  let profileService: ProfileService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileDetailsComponent ],
      imports: [
        NoopAnimationsModule,
        ProfileModule,
        RouterTestingModule.withRoutes(routes),
        
      ],
      providers: [
        {
          provide: AuthService, useValue: {
            getUser: () => ({
              id: '12234',
              username: 'test',
              firstname: 'test',
              lastname: 'test'
            }),
          }
        },
        {
          provide: ProfileService, useValue: {
            updateUser: () => of({}),
            changePassword: () => of({}),
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    router = TestBed.inject(Router);
    profileService = TestBed.inject(ProfileService);
    fixture = TestBed.createComponent(ProfileDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should updateuser attributes', () => {
    const spyFunction = spyOn(component, 'onSubmit').and.callThrough();
    component.editUserForm.patchValue({usernmae: 'Test1'});
    component.onSubmit();
    expect(spyFunction).toHaveBeenCalled();
  });

  it('should updateuser passowrd', () => {
    const spyFunction = spyOn(component, 'changePassword').and.callThrough();
    component.changePasswordForm.patchValue({oldPassword: 'Test1234!',
      newPassword: 'Test1!234'});
    component.changePassword();
    expect(spyFunction).toHaveBeenCalled();
  });
});
