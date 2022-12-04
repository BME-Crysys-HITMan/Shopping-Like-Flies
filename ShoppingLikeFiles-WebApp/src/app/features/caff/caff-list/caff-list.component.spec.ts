import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { routes } from 'src/app/app-routing.module';
import { CaffResponse } from 'src/app/sdk';
import { CaffModule } from '../caff.module';
import { CaffService } from '../caff.service';

import { CaffListComponent } from './caff-list.component';

describe('CaffListComponent', () => {
  let component: CaffListComponent;
  let fixture: ComponentFixture<CaffListComponent>;
  let router: Router;
  let caffService: CaffService;
  let dialog: MatDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CaffListComponent],
      imports: [
        NoopAnimationsModule,
        CaffModule,
        RouterTestingModule.withRoutes(routes)
      ],
      providers: [
      {
          provide: CaffService, useValue: {
            getCaffs: (): Observable<CaffResponse[]> => of([
              {
                id: 234234,
                caption: 'Test Caption',
                tags: ['test', 'tesst', 'test', 'test'],
                creator: 'Test creator',
                previewUrl: 'https://material.angular.io/assets/img/examples/shiba2.jpg'
              },
            ]),
            searchCaffs: (): Observable<CaffResponse[]> => of([
              {
                id: 234234,
                caption: 'Test Caption',
                tags: ['test', 'tesst', 'test', 'test'],
                creator: 'Test creator',
                previewUrl: 'https://material.angular.io/assets/img/examples/shiba2.jpg'
            },
            ]),
          }
        },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaffListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    router = TestBed.inject(Router);
    caffService = TestBed.inject(CaffService);
    fixture = TestBed.createComponent(CaffListComponent);
    dialog = TestBed.inject(MatDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter list', () => {
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed : of({creator: 'test'}), close: null });
    const spyObject = spyOn(dialog, 'open').and.returnValue(dialogRefSpyObj);
    component.filter();
    expect(component.fillterData.creator).toEqual('test');
  });

  it('should add caff', () => {
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed : of(true), close: null });
    const spyObject = spyOn(dialog, 'open').and.returnValue(dialogRefSpyObj);
    const spyFunction = spyOn(component, 'addCaff').and.callThrough();
    component.addCaff();
    expect(spyFunction).toHaveBeenCalled();
  });

  it('should go to details', () => {
    const spyObject = spyOn(router, 'navigate');
    component.goToDetails({
      id: 12345
    });
    expect(spyObject).toHaveBeenCalled();
  });
});
