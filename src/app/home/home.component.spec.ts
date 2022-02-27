import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { RouteConstants } from '../constants/route-constants';
import { ProjectComponent } from '../projects/project/project.component';
import { ProjectsComponent } from '../projects/projects.component';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let homeComponent: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

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
      declarations: [ HomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    homeComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the home component', () => {
    expect(homeComponent).toBeTruthy();
  });

  it('should update the current recommended project description', () => {
    expect(homeComponent.currentRecommendedProjectDescription).toEqual(homeComponent.recommendedProjects[0].projectDescription);
    homeComponent.onCarouselSlideFinished({
      to: 1
    });
    expect(homeComponent.currentRecommendedProjectDescription).toEqual(homeComponent.recommendedProjects[1].projectDescription);
  });

  it('should return a full Elapsed time label representation', () => {
    const elapsedTimeLabel: string = homeComponent.getElapsedTimeLabelRepresentation(new Date(2000, 6, 1, 10, 10, 1));
    expect(elapsedTimeLabel).toContain("month(s)");
    expect(elapsedTimeLabel).toContain("day(s)");
    expect(elapsedTimeLabel).toContain("hour(s)");
    expect(elapsedTimeLabel).toContain("minute(s)");
  });

  it('should render the page title', () => {
    const compiled = fixture.debugElement;
		expect(
			compiled.query(By.css('h1.home-page-title')).nativeElement
		).toBeTruthy();
  });

  it('should render the introduction title', () => {
    const compiled = fixture.debugElement;
		expect(
			compiled.query(By.css('h3.introduction-title')).nativeElement
		).toBeTruthy();
  });

  it('should render the news title', () => {
    const compiled = fixture.debugElement;
		expect(
			compiled.query(By.css('h3.news-title')).nativeElement
		).toBeTruthy();
  });

  it('should render the recommended projects title', () => {
    const compiled = fixture.debugElement;
		expect(
			compiled.query(By.css('h3.recommended-projects-title')).nativeElement
		).toBeTruthy();
  });

  it('should render the recommended project detail selected from the caroussel', () => {
    homeComponent.onProjectDetailNavigation(0);
    expect(homeComponent).toBeTruthy();
  });
});
