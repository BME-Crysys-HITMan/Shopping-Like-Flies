import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';
import { UsersService } from 'src/app/sdk';

import { ProfileService } from './profile.service';

describe('ProfileService', () => {
  let service: ProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: UsersService, as: 'UserApi', useValue: {
            updateUser: () => of({}),
            changePassword: () => of({}),
          }
        },
        {
          provide: AuthService, useValue: {
            setUser: (user) => {},
          }
        }
      ]
    });
    service = TestBed.inject(ProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
