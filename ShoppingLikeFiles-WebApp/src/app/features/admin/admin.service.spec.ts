import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CaffService, UsersService } from 'src/app/sdk';

import { AdminService } from './admin.service';

describe('AdminService', () => {
  let service: AdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: CaffService, as: 'CaffApi', useValue: {
            apiCaffGet: () => of([]),
            apiCaffIdGet: (id: string) => of({}),
          }
        },
        {
          provide: UsersService, as: 'UserApi', useValue: {
            apiCaffGet: () => of([]),
            apiCaffIdGet: (id: string) => of({}),
          }
        }
      ]
    });
    service = TestBed.inject(AdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
