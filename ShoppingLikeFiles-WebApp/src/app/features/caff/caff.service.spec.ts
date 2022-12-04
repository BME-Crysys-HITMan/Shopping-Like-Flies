import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CaffService as CaffApi } from 'src/app/sdk';

import { CaffService } from './caff.service';

describe('CaffService', () => {
  let service: CaffService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: CaffApi, useValue: {
          apiCaffGet: () => of([]),
          apiCaffIdGet: (id:string) => of({}),
        }}
      ]
    });
    service = TestBed.inject(CaffService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get caffs', () => {
    service.getCaffs();
    expect(service).toBeTruthy();
  });

  it('should get a caff', () => {
    service.getCaff(1234);
  });

  it('should download a caff file', () => {
    // service.downloadCaff(1234);
  });

  it('should upload a caff file', () => {
    // service.upload({} as FormData);
  });
});
