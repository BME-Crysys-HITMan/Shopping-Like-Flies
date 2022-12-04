import { TestBed } from '@angular/core/testing';
import { CookieService } from 'ngx-cookie-service';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: CookieService, useValue: {
          delete: () => ({}),
          get: (id:string) => JSON.stringify({
            user: {
              id: '234234'
            },
            token: 'asdsa' 
          }),
          set: () => ({}),
        }}
      ]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a user', () => {
    service.getUser();
  });

  it('should set User', () => {
    service.setUser(null);
  });

  it('should clear data', () => {
    service.clear();
  });

  it('should return a token', () => {
    service.getAccessToken();
  });

  it('should set token', () => {
    service.setAccessToken('3243');
  });
});
