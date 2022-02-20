import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { RouteConstants } from 'src/app/constants/route-constants';
import { SkillLevelType } from 'src/app/enums/skill-level-type';
import { HomeComponent } from 'src/app/home/home.component';
import { ProjectComponent } from 'src/app/projects/project/project.component';
import { ProjectsComponent } from 'src/app/projects/projects.component';
import { ResumesComponent } from '../resumes.component';

import { ResumeComponent } from './resume.component';

describe('ResumeComponent', () => {
  let component: ResumeComponent;
  let fixture: ComponentFixture<ResumeComponent>;

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
      declarations: [ ResumeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate if the level opacity is enabled', () => {
    const islevelZeroOpacityEnabled: boolean = component.isLevelOpacityEnabled(SkillLevelType.NOVICE, 0);
    expect(islevelZeroOpacityEnabled).toBeFalse();

    const islevelOneOpacityEnabled: boolean = component.isLevelOpacityEnabled(SkillLevelType.NOVICE, 1);
    expect(islevelOneOpacityEnabled).toBeTrue();

    const islevelTwoOpacityEnabled: boolean = component.isLevelOpacityEnabled(SkillLevelType.NOVICE, 2);
    expect(islevelTwoOpacityEnabled).toBeTrue();

    const islevelThreeOpacityEnabled: boolean = component.isLevelOpacityEnabled(SkillLevelType.NOVICE, 3);
    expect(islevelThreeOpacityEnabled).toBeTrue();

    const islevelFourOpacityEnabled: boolean = component.isLevelOpacityEnabled(SkillLevelType.NOVICE, 4);
    expect(islevelFourOpacityEnabled).toBeTrue();
  });
});
