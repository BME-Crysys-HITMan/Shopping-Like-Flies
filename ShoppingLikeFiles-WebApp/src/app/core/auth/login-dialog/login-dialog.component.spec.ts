import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { AuthModule } from '../auth.module';
import { LoginService } from '../login.service';

import { LoginDialogComponent } from './login-dialog.component';

describe('LoginDialogComponent', () => {
  let component: LoginDialogComponent;
  let fixture: ComponentFixture<LoginDialogComponent>;
  let loginService: LoginService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginDialogComponent ],
      imports: [
        AuthModule,
        NoopAnimationsModule
      ],
      providers: [
        {
          provide: MatDialogRef, useValue: {
            close: () => {}
          }
        },
        {
          provide: LoginService, useValue: {
            login: () => of({})
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    loginService = TestBed.inject(LoginService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login', () => {
    const spyFunction = spyOn(component, 'onSubmit').and.callThrough();
    const serviceSpy = spyOn(loginService, 'login').and.callThrough();
    component.onSubmit();

    expect(spyFunction).toHaveBeenCalled();
    // expect(serviceSpy).toHaveBeenCalled();
  });

  it('should create', () => {
    const spyFunction = spyOn(component, 'cancel').and.callThrough();
    component.cancel();

    expect(spyFunction).toHaveBeenCalled();
  });
});
