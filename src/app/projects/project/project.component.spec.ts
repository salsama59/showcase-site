import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { RouteConstants } from 'src/app/constants/route-constants';
import { ProjectTechnologyEnum } from 'src/app/enums/project-technology-enum';
import { ProjectTypeEnum } from 'src/app/enums/project-type-enum';
import { HomeComponent } from 'src/app/home/home.component';
import { ProjectDetail } from 'src/app/models/project-detail.model';
import { ProjectMetadatas } from 'src/app/models/project-metadatas.model';
import { Project } from 'src/app/models/project.model';
import { ScreenRsolutionData } from 'src/app/models/screen-resolution-data.model';
import { ProjectDetailsService } from 'src/app/services/project-details.service';
import { ProjectsService } from 'src/app/services/projects.service';
import { ProjectsComponent } from '../projects.component';

import { ProjectComponent } from './project.component';

describe('ProjectComponent', () => {
  let projectComponent: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;
  let projectDetailsService: ProjectDetailsService;
  let projectsService: ProjectsService;
  const webDevelopmentProject = new Project(0, "Project 0 title [TEST]", "[TEST] 0 what else is there to say.", ProjectTypeEnum.WEB_DEVELOPEMENT, [ProjectTechnologyEnum.JAVA, ProjectTechnologyEnum.HTML, ProjectTechnologyEnum.CSS], new Date(2019,10, 20), new Date());
  const gameDevelopmentProject = new Project(1, "Project 1 title [TEST]", "[TEST] 1 what else is there to say.", ProjectTypeEnum.GAME_DEVELOPEMENT, [ProjectTechnologyEnum.JAVA, ProjectTechnologyEnum.SLICK2D], new Date(2014, 5, 11), new Date(2015, 8, 20));
  const webDevelopmentProjectDetail = new ProjectDetail(0, 0, '[TEST] 0 details introduction!!!', ['Instruction 1!', 'Instruction 2!', 'Instruction 3!', 'Instruction 4!'], 'http://15.236.131.250:8080/#/', null);
  const gameDevelopmentProjectDetail = new ProjectDetail(1, 1, '[TEST] 1 details introduction!!!', ['Instruction 1!', 'Instruction 2!', 'Instruction 3!', 'Instruction 4!'], 'http://localhost/games-file/the-pit-fall/index.html', new ProjectMetadatas(true, true, true, true, ['autoplay', 'fullscreen', 'geolocation', 'microphone', 'camera', 'midi'], new ScreenRsolutionData(100, '%', 640, 'px')));

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
          }
        ])
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ projectId: '0', mode: 'view' }),
            queryParams: of({}),
            snapshot: { params: { projectId: '0', mode: 'view' } },
            url: of([
              new UrlSegment('/', {}),
              new UrlSegment('projects', {}),
              new UrlSegment('', { projectId: '0', mode: 'view' })
            ]),
            fragment: of('/projects')
          }
        },
        {
          provide: ProjectsService
        },
        {
          provide: ProjectDetailsService
        }
      ],
      declarations: [ ProjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    projectsService = TestBed.inject(ProjectsService);
    projectDetailsService = TestBed.inject(ProjectDetailsService);
    initComponent();
  });

  it('should create', () => {
    expect(projectComponent).toBeTruthy();
  });

  it('should get a web development project url', () => {
    spyOn(projectsService, 'getProjectById').withArgs(0).and.returnValue(webDevelopmentProject);
    spyOn(projectDetailsService, 'getProjectDetailByProjectId').withArgs(0).and.returnValue(webDevelopmentProjectDetail);
    initComponent();
    const projectUrl: string  = projectComponent.getProjectUrl() as string;
    expect(projectUrl).toBeDefined();
  });

  it('should get a game development project url', () => {
    spyOn(projectsService, 'getProjectById').withArgs(0).and.returnValue(gameDevelopmentProject);
    spyOn(projectDetailsService, 'getProjectDetailByProjectId').withArgs(0).and.returnValue(gameDevelopmentProjectDetail);
    initComponent();
    const projectUrl: string  = projectComponent.getProjectUrl() as string;
    expect(projectUrl).toBeDefined();
  });

  it('should get a game development project permission', () => {
    spyOn(projectsService, 'getProjectById').withArgs(0).and.returnValue(gameDevelopmentProject);
    spyOn(projectDetailsService, 'getProjectDetailByProjectId').withArgs(0).and.returnValue(gameDevelopmentProjectDetail);
    initComponent();
    const projectPermissions: string  = projectComponent.getProjectPermissions();
    expect(projectPermissions).toBeDefined();
  });

  it('should get a web development project permission', () => {
    spyOn(projectsService, 'getProjectById').withArgs(0).and.returnValue(webDevelopmentProject);
    spyOn(projectDetailsService, 'getProjectDetailByProjectId').withArgs(0).and.returnValue(webDevelopmentProjectDetail);
    initComponent();
    const projectPermissions: string  = projectComponent.getProjectPermissions();
    expect(projectPermissions).toBeDefined();
  });


  it('should get an empty project url', () => {
    spyOn(projectsService, 'getProjectById').withArgs(0).and.returnValue(undefined);
    spyOn(projectDetailsService, 'getProjectDetailByProjectId').withArgs(0).and.returnValue(undefined);
    initComponent();
    const projectUrl: string  = projectComponent.getProjectUrl() as string;
    expect(projectUrl).toBeDefined();
  });

  it('should get an empty project permission', () => {
    spyOn(projectsService, 'getProjectById').withArgs(0).and.returnValue(undefined);
    spyOn(projectDetailsService, 'getProjectDetailByProjectId').withArgs(0).and.returnValue(undefined);
    initComponent();
    const projectPermissions: string  = projectComponent.getProjectPermissions();
    expect(projectPermissions).toBeDefined();
  });

  it('should get an empty project resolution data width with an undefined project', () => {
    spyOn(projectsService, 'getProjectById').withArgs(0).and.returnValue(undefined);
    spyOn(projectDetailsService, 'getProjectDetailByProjectId').withArgs(0).and.returnValue(gameDevelopmentProjectDetail);
    initComponent();
    const projectDatawidth: string  = projectComponent.getProjectResolutionDataWidth();
    expect(projectDatawidth).toBeDefined();
  });

  it('should get an empty project resolution data width with an undefined project and project detail', () => {
    spyOn(projectsService, 'getProjectById').withArgs(0).and.returnValue(undefined);
    spyOn(projectDetailsService, 'getProjectDetailByProjectId').withArgs(0).and.returnValue(undefined);
    initComponent();
    const projectDatawidth: string  = projectComponent.getProjectResolutionDataWidth();
    expect(projectDatawidth).toBeDefined();
  });

  it('should get an empty project resolution data height with an undefined project', () => {
    spyOn(projectsService, 'getProjectById').withArgs(0).and.returnValue(undefined);
    spyOn(projectDetailsService, 'getProjectDetailByProjectId').withArgs(0).and.returnValue(gameDevelopmentProjectDetail);
    initComponent();
    const projectDataHeight: string  = projectComponent.getProjectResolutionDataHeight();
    expect(projectDataHeight).toBeDefined();
  });

  it('should get an empty project resolution data height with an undefined project and project detail', () => {
    spyOn(projectsService, 'getProjectById').withArgs(0).and.returnValue(undefined);
    spyOn(projectDetailsService, 'getProjectDetailByProjectId').withArgs(0).and.returnValue(undefined);
    initComponent();
    const projectDataHeight: string  = projectComponent.getProjectResolutionDataHeight();
    expect(projectDataHeight).toBeDefined();
  });

  function initComponent(): void {
    fixture = TestBed.createComponent(ProjectComponent);
    projectComponent = fixture.componentInstance;
    fixture.detectChanges();
  }
  
});