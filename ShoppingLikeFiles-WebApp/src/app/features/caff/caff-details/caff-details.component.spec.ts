import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { routes } from 'src/app/app-routing.module';
import { CaffModule } from '../caff.module';
import { CaffService } from '../caff.service';

import { CaffDetailsComponent } from './caff-details.component';

describe('CaffDetailsComponent', () => {
  let component: CaffDetailsComponent;
  let fixture: ComponentFixture<CaffDetailsComponent>;
  let router: Router;
  let caffService: CaffService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaffDetailsComponent ],
      imports: [
        NoopAnimationsModule,
        CaffModule,
        RouterTestingModule.withRoutes(routes)
      ],
      providers: [{
        provide: CaffService, useValue: {}
      },
      {
        provide: ActivatedRoute, useValue: {
          paramMap: of({
            get: (key: string) => {
              if (key === 'id') {
                return '123456';
              }
              return undefined;
            }
          })
        }
      }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaffDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    router = TestBed.inject(Router);
    caffService = TestBed.inject(CaffService);
    fixture = TestBed.createComponent(CaffDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add comment', () => {
    component.commentForm.patchValue({comment: 'Test'});
    const commentsLength = component.comments.length; 
    component.addComment();
    expect(component.comments.length).toBe(commentsLength + 1);
  });

  it('should buy the caff', () => {
    const spyFunction = spyOn(component, 'buyCaff').and.callThrough();
    component.buyCaff();
    expect(spyFunction).toHaveBeenCalled();
  });
});
