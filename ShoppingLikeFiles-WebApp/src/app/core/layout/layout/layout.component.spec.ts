import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxSpinnerService } from 'ngx-spinner';
import { of } from 'rxjs';
import { routes } from 'src/app/app-routing.module';
import { MaterialModule } from 'src/app/material.module';
import { AuthService } from '../../auth/auth.service';
import { LoginService } from '../../auth/login.service';
import { LayoutModule } from '../layout.module';

import { LayoutComponent } from './layout.component';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [LayoutComponent],
      imports: [
        RouterTestingModule.withRoutes(routes),
        CommonModule,
        LayoutModule,
        NoopAnimationsModule
      ],
      providers: [
        {
          provide: LoginService, useValue: {
            login: () => of({}),
            logout: () => of({}),
          }
        },
        {
          provide: AuthService, useValue: {
            getUser: () => of({}),
          }
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
