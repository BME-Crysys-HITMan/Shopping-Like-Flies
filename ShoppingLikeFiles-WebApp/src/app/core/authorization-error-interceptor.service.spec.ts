import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from '../app-routing.module';
import { AuthService } from './auth/auth.service';

import { AuthorizationErrorInterceptorService } from './authorization-error-interceptor.service';

describe('AuthorizationErrorInterceptorService', () => {
  let service: AuthorizationErrorInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes)
      ],
      providers: [
        {
          provide: AuthService, useValue: {
            getAccessToken: () => 'token',
          }
        }
      ]
    });
    service = TestBed.inject(AuthorizationErrorInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
