import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { RouteConstants } from '../constants/route-constants';
import { NewsType } from '../enums/news-type';
import { ProjectTechnologyEnum } from '../enums/project-technology-enum';
import { ProjectTypeEnum } from '../enums/project-type-enum';
import { News } from '../models/news.model';
import { Project } from '../models/project.model';
import { ProjectComponent } from '../projects/project/project.component';
import { ProjectsComponent } from '../projects/projects.component';
import { LocaleService } from '../services/locale.service';
import { NewsService } from '../services/news.service';
import { ProjectsService } from '../services/projects.service';
import { TranslationsService } from '../services/translations.service';
import { ProjectUtilsService } from '../utils/project-utils.service';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let newsServiceSpy: jasmine.SpyObj<NewsService>;
  let projectsServiceSpy: jasmine.SpyObj<ProjectsService>;
  let translationsServiceSpy: jasmine.SpyObj<TranslationsService> = jasmine.createSpyObj('TranslationsService', ['get']);
  let homeComponent: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    newsServiceSpy = jasmine.createSpyObj('NewsService', ['getNews']);
    projectsServiceSpy = jasmine.createSpyObj('ProjectsService', ['getProjects']);
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
        ]), HttpClientModule
      ],
      declarations: [ HomeComponent ],
			providers: [ 
        ProjectUtilsService, 
        {provide: NewsService, useValue: newsServiceSpy},
        {provide: ProjectsService, useValue: projectsServiceSpy},
        {provide: TranslationsService, useValue: translationsServiceSpy},
        LocaleService],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    const expectedNews: Observable<News[]> = of([
      new News('4ssd4q6f4q', 'des', NewsType.CREATE, new Date(), true),
      new News('4ssd4q6f4q', 'des', NewsType.CREATE, new Date(), true),
      new News('4ssd4q6f4q', 'des', NewsType.CREATE, new Date(), true),
      new News('4ssd4q6f4q', 'des', NewsType.CREATE, new Date(), true)
    ]);

    const expectedProjects: Observable<Project[]> = of([
      new Project('0', "Project 0 title", "This is the project 0 what else is there to say.", ProjectTypeEnum.WEB_DEVELOPEMENT, [ProjectTechnologyEnum.JAVA, ProjectTechnologyEnum.HTML, ProjectTechnologyEnum.CSS], new Date(2019,10, 20), new Date()),
      new Project('1', "Project 1 title", "This is the project 1 what else is there to say.", ProjectTypeEnum.GAME_DEVELOPEMENT, [ProjectTechnologyEnum.JAVA, ProjectTechnologyEnum.SLICK2D], new Date(2014, 5, 11), new Date(2015, 8, 20)),
      new Project('2', "Project 2 title", "This is the project 2 what else is there to say.", ProjectTypeEnum.WEB_DEVELOPEMENT, [ProjectTechnologyEnum.JAVA, ProjectTechnologyEnum.HTML, ProjectTechnologyEnum.CSS, ProjectTechnologyEnum.ANGULAR], new Date(2021,0, 10), new Date(2022,0, 10)),
      new Project('3', "Project 3 title", "This is the project 3 what else is there to say.", ProjectTypeEnum.WEB_DEVELOPEMENT, [ProjectTechnologyEnum.C_SHARP, ProjectTechnologyEnum.HTML, ProjectTechnologyEnum.CSS, ProjectTechnologyEnum.DOT_NET], new Date(2010,11, 6), new Date(2011,10, 6)),
      new Project('4', "Project 4 title", "This is the project 4 what else is there to say.", ProjectTypeEnum.WEB_DEVELOPEMENT, [ProjectTechnologyEnum.JAVA, ProjectTechnologyEnum.HTML, ProjectTechnologyEnum.CSS], new Date(2009,10, 20), new Date(2018,11, 24)),
      new Project('5', "Project 5 title", "This is the project 5 what else is there to say.", ProjectTypeEnum.GAME_DEVELOPEMENT, [ProjectTechnologyEnum.C_SHARP, ProjectTechnologyEnum.UNITY], new Date(2000, 8, 20), new Date(2021, 8, 20))
    ]);

    newsServiceSpy.getNews.and.returnValues(expectedNews);
    projectsServiceSpy.getProjects.and.returnValues(expectedProjects);

    translationsServiceSpy.get.and.callFake((key) => {

      if(key === 'project.element.0.description') {
        return 'This is the project 0 what else is there to say.';
      }
      if(key === 'project.element.2.description') {
        return 'This is the project 2 what else is there to say.';
      }
      if(key === 'home.page.news.section.duration.details.minutes.text') {
        return 'minute(s)';
      }
      if(key === 'home.page.news.section.duration.details.hours.text') {
        return 'hour(s)';
      }
      if(key === 'home.page.news.section.duration.details.days.text') {
        return 'day(s)';
      }
      if(key === 'home.page.news.section.duration.details.months.text') {
        return 'month(s)';
      }
      
      return <string>key;
    });
    
    fixture = TestBed.createComponent(HomeComponent);
    homeComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the home component', () => {
    expect(homeComponent).toBeTruthy();
  });

  it('should update the current recommended project description', () => {
    
    expect(homeComponent.currentRecommendedProjectDescription).toEqual(homeComponent.recommendedProjectsTodisplay[0].projectDescriptionTranslationKey);
    homeComponent.onCarouselSlideFinished({
      to: 1
    });
    expect(homeComponent.currentRecommendedProjectDescription).toEqual(homeComponent.recommendedProjectsTodisplay[1].projectDescriptionTranslationKey);
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
    homeComponent.onProjectDetailNavigation('0');
    expect(homeComponent).toBeTruthy();
  });
});
