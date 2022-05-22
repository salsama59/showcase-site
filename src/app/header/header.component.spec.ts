import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { RouteConstants } from '../constants/route-constants';
import { HomeComponent } from '../home/home.component';
import { ProjectComponent } from '../projects/project/project.component';
import { ProjectsComponent } from '../projects/projects.component';
import { TranslationsResolver } from '../resolvers/translations.resolver';
import { ResumeComponent } from '../resumes/resume/resume.component';
import { ResumesComponent } from '../resumes/resumes.component';
import { TranslationsService } from '../services/translations.service';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let translationsServiceSpy: jasmine.SpyObj<TranslationsService> = jasmine.createSpyObj('TranslationsService', ['get']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          {
            path: RouteConstants.HOME_ROUTE_PATH,
            component: HomeComponent,
            resolve: [TranslationsResolver]
          },
          {
            path: RouteConstants.PROJECTS_ROUTE_PATH,
            component: ProjectsComponent,
            resolve: [TranslationsResolver]
          },
          { path: RouteConstants.PROJECT_VIEW_MODE_ROUTE_PATH, 
            component: ProjectComponent ,
            resolve: [TranslationsResolver]
          },
          { path: RouteConstants.RESUMES_ROUTE_PATH, 
            component: ResumesComponent, 
            resolve: [TranslationsResolver],
            children: [
              { path: RouteConstants.RESUME_VIEW_MODE_ROUTE_PATH, component: ResumeComponent }
            ]
          }
        ]),
        FormsModule
      ],
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: HttpClient },
        { provide: TranslationsService, useValue: translationsServiceSpy}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    translationsServiceSpy.get.and.callFake((key) => {
      if(key === 'header.resumes.link.text') {
        return 'Resume';
      }

      if(key === 'header.projects.link.text') {
        return 'Projects';
      }

      if(key === 'header.home.link.text') {
        return 'Home';
      }
      return '';
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the header component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the Home link', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('header nav div#navbarNav ul > li a').item(0).textContent).toContain('Home');
  });

  it('should render the Resume link', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('header nav div#navbarNav ul > li a').item(1).textContent).toContain('Resume');
  });

  it('should render the Projects link', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('header nav div#navbarNav ul > li a').item(2).textContent).toContain('Projects');
  });
});
