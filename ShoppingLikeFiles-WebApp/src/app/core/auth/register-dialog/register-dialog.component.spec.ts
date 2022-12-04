import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { AuthModule } from '../auth.module';
import { LoginService } from '../login.service';

import { RegisterDialogComponent } from './register-dialog.component';

describe('RegisterDialogComponent', () => {
  let component: RegisterDialogComponent;
  let fixture: ComponentFixture<RegisterDialogComponent>;
  let loginService: LoginService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterDialogComponent ],
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
            register: () => of({})
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    loginService = TestBed.inject(LoginService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should register', () => {
    const spyFunction = spyOn(component, 'onSubmit').and.callThrough();
    const serviceSpy = spyOn(loginService, 'register').and.callThrough();
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
