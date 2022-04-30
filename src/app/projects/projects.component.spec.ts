import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { RouteConstants } from '../constants/route-constants';
import { RouteModeConstants } from '../constants/route-mode-constants';
import { ProjectSortType } from '../enums/project-sort-type';
import { ProjectTechnologyEnum } from '../enums/project-technology-enum';
import { ProjectTypeEnum } from '../enums/project-type-enum';
import { SortOrder } from '../enums/sort-order';
import { HomeComponent } from '../home/home.component';
import { Project } from '../models/project.model';
import { ProjectsService } from '../services/projects.service';
import { ProjectComponent } from './project/project.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProjectsComponent } from './projects.component';
import { ResumesComponent } from '../resumes/resumes.component';
import { ResumeComponent } from '../resumes/resume/resume.component';
import { HttpClient } from '@angular/common/http';

describe('ProjectsComponent', () => {
  let projectsComponent: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;
  let activatedRoute: ActivatedRoute;
	let router: Router;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(async () => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
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
      declarations: [ ProjectsComponent ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ projectId: '0', mode: 'view', page: '1'}),
            queryParams: of({ projectId: '0', mode: 'view', page: '1'}),
            snapshot: { params: { projectId: '0', mode: 'view', page: '1'} },
            url: of([
              new UrlSegment('/', {}),
              new UrlSegment(RouteConstants.PROJECTS_ROUTE_PATH, { projectId: '0', mode: 'view', page: '1' })
            ]),
            fragment: of('/' + RouteConstants.PROJECTS_ROUTE_PATH)
          }
        },
				{provide: ProjectsService},
        { provide: HttpClient, useValue: httpClientSpy }
			],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    const expectedProjects: Observable<Project[]> = of([
      new Project('0', "Project 0 title", "This is the project 0 what else is there to say.", ProjectTypeEnum.WEB_DEVELOPEMENT, [ProjectTechnologyEnum.JAVA, ProjectTechnologyEnum.HTML, ProjectTechnologyEnum.CSS], new Date(2019,10, 20), new Date()),
      new Project('1', "Project 1 title", "This is the project 1 what else is there to say.", ProjectTypeEnum.GAME_DEVELOPEMENT, [ProjectTechnologyEnum.JAVA, ProjectTechnologyEnum.SLICK2D], new Date(2014, 5, 11), new Date(2015, 8, 20)),
      new Project('2', "Project 2 title", "This is the project 2 what else is there to say.", ProjectTypeEnum.WEB_DEVELOPEMENT, [ProjectTechnologyEnum.JAVA, ProjectTechnologyEnum.HTML, ProjectTechnologyEnum.CSS, ProjectTechnologyEnum.ANGULAR], new Date(2021,0, 10), new Date(2022,0, 10)),
      new Project('3', "Project 3 title", "This is the project 3 what else is there to say.", ProjectTypeEnum.WEB_DEVELOPEMENT, [ProjectTechnologyEnum.C_SHARP, ProjectTechnologyEnum.HTML, ProjectTechnologyEnum.CSS, ProjectTechnologyEnum.DOT_NET], new Date(2010,11, 6), new Date(2011,10, 6)),
      new Project('4', "Project 4 title", "This is the project 4 what else is there to say.", ProjectTypeEnum.WEB_DEVELOPEMENT, [ProjectTechnologyEnum.JAVA, ProjectTechnologyEnum.HTML, ProjectTechnologyEnum.CSS], new Date(2009,10, 20), new Date(2018,11, 24)),
      new Project('5', "Project 5 title", "This is the project 5 what else is there to say.", ProjectTypeEnum.GAME_DEVELOPEMENT, [ProjectTechnologyEnum.C_SHARP, ProjectTechnologyEnum.UNITY], new Date(2000, 8, 20), new Date(2021, 8, 20))
    ]);

    httpClientSpy.get.and.returnValue(expectedProjects);
    fixture = TestBed.createComponent(ProjectsComponent);
    projectsComponent = fixture.componentInstance;
    
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create the projects component', () => {
    expect(projectsComponent).toBeTruthy();
  });

  it('should render the page title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1.project-list-title')?.textContent).toContain('Project list page');
  });

  it('should navigate to view project section', () => {
		const spy = spyOn(router, 'navigate');
		projectsComponent.onViewProjectElement('0');
		expect(spy).toHaveBeenCalledWith(['0', RouteModeConstants.MODE_VIEW_CONSTANT], {
			relativeTo: activatedRoute
		});
	});

  it('should posess six projects', () => {
    expect(projectsComponent.projectListToDisplay).toBeDefined();
		expect(projectsComponent.projectListToDisplay).toHaveSize(4);
	});

  it('should filter the projects', () => {
    expect(projectsComponent.projectListToDisplay).toBeDefined();
    expect(projectsComponent.projectTypeFilters).toBeDefined();
    expect(projectsComponent.projectTechnologiesFilters).toBeDefined();

		expect(projectsComponent.projectListToDisplay).toHaveSize(4);
    expect(projectsComponent.projectTypeFilters).toHaveSize(2);
    expect(projectsComponent.projectTechnologiesFilters).toHaveSize(8);
    projectsComponent.projectTypeFilters[0].isFilterActive = false;
		projectsComponent.onProjectFilterChange(true);

    expect(projectsComponent.projectListToDisplay).toHaveSize(2);
	});

  it('should sort the projects by CREATION DATE in DESCENDING then ASCENDING order', () => {
    expect(projectsComponent.projectListToDisplay).toBeDefined();
    expect(projectsComponent.userSortChoice).toBeDefined();
    expect(projectsComponent.userSortOrderChoice).toBeDefined();
    expect(projectsComponent.sortLabel).toBeDefined();

		expect(projectsComponent.projectListToDisplay).toHaveSize(4);
    expect(projectsComponent.userSortChoice).toEqual(ProjectSortType.CREATION_DATE);
    expect(projectsComponent.userSortOrderChoice).toEqual(SortOrder.ASCENDING);
    expect(projectsComponent.sortLabel).toEqual('ASC');

		projectsComponent.onSortOrderUpdate();

    expect(projectsComponent.projectListToDisplay).toHaveSize(4);
    expect(projectsComponent.userSortChoice).toEqual(ProjectSortType.CREATION_DATE);
    expect(projectsComponent.userSortOrderChoice).toEqual(SortOrder.DESCENDING);
    expect(projectsComponent.sortLabel).toEqual('DESC');

    projectsComponent.onSortOrderUpdate();

    expect(projectsComponent.projectListToDisplay).toHaveSize(4);
    expect(projectsComponent.userSortChoice).toEqual(ProjectSortType.CREATION_DATE);
    expect(projectsComponent.userSortOrderChoice).toEqual(SortOrder.ASCENDING);
    expect(projectsComponent.sortLabel).toEqual('ASC');

	});

  it('should sort the projects by PROJECT TYPE in ASCENDING then DESCENDING order', () => {
    expect(projectsComponent.projectListToDisplay).toBeDefined();
    expect(projectsComponent.userSortChoice).toBeDefined();
    expect(projectsComponent.userSortOrderChoice).toBeDefined();
    expect(projectsComponent.sortLabel).toBeDefined();

		expect(projectsComponent.projectListToDisplay).toHaveSize(4);
    projectsComponent.userSortChoice = ProjectSortType.PROJECT_TYPE;
    expect(projectsComponent.userSortOrderChoice).toEqual(SortOrder.ASCENDING);
    expect(projectsComponent.sortLabel).toEqual('ASC');

		projectsComponent.onSortOrderUpdate();

    expect(projectsComponent.projectListToDisplay).toHaveSize(4);
    expect(projectsComponent.userSortChoice).toEqual(ProjectSortType.PROJECT_TYPE);
    expect(projectsComponent.userSortOrderChoice).toEqual(SortOrder.DESCENDING);
    expect(projectsComponent.sortLabel).toEqual('DESC');

    projectsComponent.onSortOrderUpdate();

    expect(projectsComponent.projectListToDisplay).toHaveSize(4);
    expect(projectsComponent.userSortChoice).toEqual(ProjectSortType.PROJECT_TYPE);
    expect(projectsComponent.userSortOrderChoice).toEqual(SortOrder.ASCENDING);
    expect(projectsComponent.sortLabel).toEqual('ASC');

	});

  it('should sort the projects by PROJECT TITLE in ASCENDING then DESCENDING order', () => {
    expect(projectsComponent.projectListToDisplay).toBeDefined();
    expect(projectsComponent.userSortChoice).toBeDefined();
    expect(projectsComponent.userSortOrderChoice).toBeDefined();
    expect(projectsComponent.sortLabel).toBeDefined();

		expect(projectsComponent.projectListToDisplay).toHaveSize(4);
    projectsComponent.userSortChoice = ProjectSortType.TITLE;
    expect(projectsComponent.userSortOrderChoice).toEqual(SortOrder.ASCENDING);
    expect(projectsComponent.sortLabel).toEqual('ASC');

		projectsComponent.onSortOrderUpdate();

    expect(projectsComponent.projectListToDisplay).toHaveSize(4);
    expect(projectsComponent.userSortChoice).toEqual(ProjectSortType.TITLE);
    expect(projectsComponent.userSortOrderChoice).toEqual(SortOrder.DESCENDING);
    expect(projectsComponent.sortLabel).toEqual('DESC');

    projectsComponent.onSortOrderUpdate();

    expect(projectsComponent.projectListToDisplay).toHaveSize(4);
    expect(projectsComponent.userSortChoice).toEqual(ProjectSortType.TITLE);
    expect(projectsComponent.userSortOrderChoice).toEqual(SortOrder.ASCENDING);
    expect(projectsComponent.sortLabel).toEqual('ASC');

	});


  it('should sort the projects by LAST MODIFIED DATE in ASCENDING then DESCENDING order', () => {
    expect(projectsComponent.projectListToDisplay).toBeDefined();
    expect(projectsComponent.userSortChoice).toBeDefined();
    expect(projectsComponent.userSortOrderChoice).toBeDefined();
    expect(projectsComponent.sortLabel).toBeDefined();

		expect(projectsComponent.projectListToDisplay).toHaveSize(4);
    projectsComponent.userSortChoice = ProjectSortType.LAST_MODIFIED;
    expect(projectsComponent.userSortOrderChoice).toEqual(SortOrder.ASCENDING);
    expect(projectsComponent.sortLabel).toEqual('ASC');

		projectsComponent.onSortOrderUpdate();

    expect(projectsComponent.projectListToDisplay).toHaveSize(4);
    expect(projectsComponent.userSortChoice).toEqual(ProjectSortType.LAST_MODIFIED);
    expect(projectsComponent.userSortOrderChoice).toEqual(SortOrder.DESCENDING);
    expect(projectsComponent.sortLabel).toEqual('DESC');

    projectsComponent.onSortOrderUpdate();

    expect(projectsComponent.projectListToDisplay).toHaveSize(4);
    expect(projectsComponent.userSortChoice).toEqual(ProjectSortType.LAST_MODIFIED);
    expect(projectsComponent.userSortOrderChoice).toEqual(SortOrder.ASCENDING);
    expect(projectsComponent.sortLabel).toEqual('ASC');

	});

  it('should paginate the projects on page 1', () => {
    expect(projectsComponent.projectListToDisplay).toBeDefined();
		expect(projectsComponent.projectListToDisplay).toHaveSize(4);
		projectsComponent.paginateProjects(1, null);
    expect(projectsComponent.projectListToDisplay).toHaveSize(4);
	});

  it('should not paginate the projects on page 100 but 1', () => {
    expect(projectsComponent.projectListToDisplay).toBeDefined();
		expect(projectsComponent.projectListToDisplay).toHaveSize(4);
		projectsComponent.paginateProjects(100, null);
    expect(projectsComponent.projectListToDisplay).toHaveSize(2);
	});

  it('should get the projects length', () => {
    expect(projectsComponent.projectListToDisplay).toBeDefined();
		expect(projectsComponent.projectListToDisplay).toHaveSize(4);
    projectsComponent.projectListToDisplay = [];
    expect(projectsComponent.projectListToDisplay).toHaveSize(0);
    expect(projectsComponent.getProjectListLength()).toBe(6);
	});
});

