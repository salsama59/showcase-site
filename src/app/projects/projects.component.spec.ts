import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { RouteConstants } from '../constants/route-constants';
import { ProjectSortType } from '../enums/project-sort-type';
import { SortOrder } from '../enums/sort-order';
import { HomeComponent } from '../home/home.component';
import { ProjectsService } from '../services/projects.service';
import { ProjectComponent } from './project/project.component';

import { ProjectsComponent } from './projects.component';

describe('ProjectsComponent', () => {
  let component: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;
  let activatedRoute: ActivatedRoute;
	let router: Router;
  let projectsService: ProjectsService;

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
        ]),
        FormsModule
      ],
      declarations: [ ProjectsComponent ],
      providers: [
				{
					provide: ProjectsService
				}
			],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
    projectsService = TestBed.inject(ProjectsService);
    fixture.detectChanges();
  });

  it('should create the projects component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the page title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1.project-list-title')?.textContent).toContain('Project list page');
  });

  it('should navigate to view project section', () => {
		const spy = spyOn(router, 'navigate');
		component.onViewProjectElement(0);
		expect(spy).toHaveBeenCalledWith([0, 'view'], {
			relativeTo: activatedRoute
		});
	});

  it('should posess six projects', () => {
    expect(component.projectList).toBeDefined();
		expect(component.projectList).toHaveSize(6);
	});

  it('should filter the projects', () => {
    expect(component.projectList).toBeDefined();
    expect(component.projectTypeFilters).toBeDefined();
    expect(component.projectTechnologiesFilters).toBeDefined();

		expect(component.projectList).toHaveSize(6);
    expect(component.projectTypeFilters).toHaveSize(2);
    expect(component.projectTechnologiesFilters).toHaveSize(8);
    component.projectTypeFilters[0].isFilterActive = false;
		component.onProjectFilterChange();

    expect(component.projectList).toHaveSize(2);
	});


  it('should sort the projects by CREATION DATE in DESCENDING then ASCENDING order', () => {
    expect(component.projectList).toBeDefined();
    expect(component.userSortChoice).toBeDefined();
    expect(component.userSortOrderChoice).toBeDefined();
    expect(component.sortLabel).toBeDefined();

		expect(component.projectList).toHaveSize(6);
    expect(component.userSortChoice).toEqual(ProjectSortType.CREATION_DATE);
    expect(component.userSortOrderChoice).toEqual(SortOrder.ASCENDING);
    expect(component.sortLabel).toEqual('ASC');

		component.onSortOrderUpdate();

    expect(component.projectList).toHaveSize(6);
    expect(component.userSortChoice).toEqual(ProjectSortType.CREATION_DATE);
    expect(component.userSortOrderChoice).toEqual(SortOrder.DESCENDING);
    expect(component.sortLabel).toEqual('DESC');

    component.onSortOrderUpdate();

    expect(component.projectList).toHaveSize(6);
    expect(component.userSortChoice).toEqual(ProjectSortType.CREATION_DATE);
    expect(component.userSortOrderChoice).toEqual(SortOrder.ASCENDING);
    expect(component.sortLabel).toEqual('ASC');

	});

  it('should sort the projects by PROJECT TYPE in ASCENDING then DESCENDING order', () => {
    expect(component.projectList).toBeDefined();
    expect(component.userSortChoice).toBeDefined();
    expect(component.userSortOrderChoice).toBeDefined();
    expect(component.sortLabel).toBeDefined();

		expect(component.projectList).toHaveSize(6);
    component.userSortChoice = ProjectSortType.PROJECT_TYPE;
    expect(component.userSortOrderChoice).toEqual(SortOrder.ASCENDING);
    expect(component.sortLabel).toEqual('ASC');

		component.onSortOrderUpdate();

    expect(component.projectList).toHaveSize(6);
    expect(component.userSortChoice).toEqual(ProjectSortType.PROJECT_TYPE);
    expect(component.userSortOrderChoice).toEqual(SortOrder.DESCENDING);
    expect(component.sortLabel).toEqual('DESC');

    component.onSortOrderUpdate();

    expect(component.projectList).toHaveSize(6);
    expect(component.userSortChoice).toEqual(ProjectSortType.PROJECT_TYPE);
    expect(component.userSortOrderChoice).toEqual(SortOrder.ASCENDING);
    expect(component.sortLabel).toEqual('ASC');

	});


  it('should sort the projects by PROJECT TITLE in ASCENDING then DESCENDING order', () => {
    expect(component.projectList).toBeDefined();
    expect(component.userSortChoice).toBeDefined();
    expect(component.userSortOrderChoice).toBeDefined();
    expect(component.sortLabel).toBeDefined();

		expect(component.projectList).toHaveSize(6);
    component.userSortChoice = ProjectSortType.TITLE;
    expect(component.userSortOrderChoice).toEqual(SortOrder.ASCENDING);
    expect(component.sortLabel).toEqual('ASC');

		component.onSortOrderUpdate();

    expect(component.projectList).toHaveSize(6);
    expect(component.userSortChoice).toEqual(ProjectSortType.TITLE);
    expect(component.userSortOrderChoice).toEqual(SortOrder.DESCENDING);
    expect(component.sortLabel).toEqual('DESC');

    component.onSortOrderUpdate();

    expect(component.projectList).toHaveSize(6);
    expect(component.userSortChoice).toEqual(ProjectSortType.TITLE);
    expect(component.userSortOrderChoice).toEqual(SortOrder.ASCENDING);
    expect(component.sortLabel).toEqual('ASC');

	});


  it('should sort the projects by LAST MODIFIED DATE in ASCENDING then DESCENDING order', () => {
    expect(component.projectList).toBeDefined();
    expect(component.userSortChoice).toBeDefined();
    expect(component.userSortOrderChoice).toBeDefined();
    expect(component.sortLabel).toBeDefined();

		expect(component.projectList).toHaveSize(6);
    component.userSortChoice = ProjectSortType.LAST_MODIFIED;
    expect(component.userSortOrderChoice).toEqual(SortOrder.ASCENDING);
    expect(component.sortLabel).toEqual('ASC');

		component.onSortOrderUpdate();

    expect(component.projectList).toHaveSize(6);
    expect(component.userSortChoice).toEqual(ProjectSortType.LAST_MODIFIED);
    expect(component.userSortOrderChoice).toEqual(SortOrder.DESCENDING);
    expect(component.sortLabel).toEqual('DESC');

    component.onSortOrderUpdate();

    expect(component.projectList).toHaveSize(6);
    expect(component.userSortChoice).toEqual(ProjectSortType.LAST_MODIFIED);
    expect(component.userSortOrderChoice).toEqual(SortOrder.ASCENDING);
    expect(component.sortLabel).toEqual('ASC');

	});
});

