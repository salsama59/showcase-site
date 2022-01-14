import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ProjectTypeEnum } from '../enums/project-type-enum';
import { Project } from '../models/project.model';
import { ProjectsService } from '../services/projects.service';

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
						path: 'projects',
						component: ProjectsComponent,
						//children: [{ path: ':playerId', component: PlayerComponent }]
					}
				])
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
});
