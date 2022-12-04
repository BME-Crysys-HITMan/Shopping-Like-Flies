import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { RegisterService, LoginService as LoginApi } from 'src/app/sdk';
import { AuthService } from './auth.service';

import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: LoginApi, as: 'LoginApi', useValue: {
          apiLoginPost: () => of({}),
          apiLoginDelete: () => of({}),
        }},
        {provide: AuthService,  useValue: {
          setToken: () => ({}),
          SetUser: () => of({}),
          clear: () => {}
        }},
        {provide: RegisterService, as: 'LoginApi', useValue: {
          apiRegisterPost: () => of({}),
        }}
      ]
    });
    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call register api', () => {
    service.register({});
  });

  it('sshould call login api', () => {
    service.login({});
  });

  it('sshould call logout api', () => {
    service.logout();
  });
});
