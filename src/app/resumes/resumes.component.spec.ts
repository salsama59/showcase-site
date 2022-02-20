import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { RouteConstants } from '../constants/route-constants';
import { HomeComponent } from '../home/home.component';
import { ProjectComponent } from '../projects/project/project.component';
import { ProjectsComponent } from '../projects/projects.component';
import { ResumeComponent } from './resume/resume.component';

import { ResumesComponent } from './resumes.component';

describe('ResumesComponent', () => {
  let resumesComponent: ResumesComponent;
  let fixture: ComponentFixture<ResumesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: RouteConstants.HOME_ROUTE_PATH,
            component: HomeComponent
          },
          {
            path: RouteConstants.PROJECTS_ROUTE_PATH,
            component: ProjectsComponent
          },
          { path: RouteConstants.PROJECT_VIEW_MODE_ROUTE_PATH, 
            component: ProjectComponent 
          },
          { path: RouteConstants.RESUMES_ROUTE_PATH, 
            component: ResumesComponent, children: [
              { path: RouteConstants.RESUME_VIEW_MODE_ROUTE_PATH, component: ResumeComponent }
            ]
          }
        ]),
        FormsModule
      ],
      declarations: [ ResumesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumesComponent);
    resumesComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(resumesComponent).toBeTruthy();
  });

  it('should display 2 resumes', () => {
    expect(resumesComponent.resumes).toHaveSize(2);
  });

  it('should focus on the default resume', () => {
    expect(resumesComponent.defaultResumeId).toBeGreaterThan(-1);
  });
});
