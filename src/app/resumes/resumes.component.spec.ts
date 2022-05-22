import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { RouteConstants } from '../constants/route-constants';
import { LanguageLevelType } from '../enums/language-level-type';
import { SkillLevelType } from '../enums/skill-level-type';
import { HomeComponent } from '../home/home.component';
import { Address } from '../models/address.model';
import { Contact } from '../models/contact.model';
import { Detail } from '../models/detail.model';
import { Education } from '../models/education.model';
import { EmploymentHistory } from '../models/employment-history.model';
import { Language } from '../models/language.model';
import { Person } from '../models/person.model';
import { Resume } from '../models/resume.model';
import { Skill } from '../models/skill.model';
import { SocialNetwork } from '../models/social-network.model';
import { ProjectComponent } from '../projects/project/project.component';
import { ProjectsComponent } from '../projects/projects.component';
import { ResumesService } from '../services/resumes.service';
import { ResumeComponent } from './resume/resume.component';

import { ResumesComponent } from './resumes.component';

describe('ResumesComponent', () => {
  let resumesComponent: ResumesComponent;
  let fixture: ComponentFixture<ResumesComponent>;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(async () => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
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
      declarations: [ ResumesComponent ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ resumeId: '0', mode: 'view'}),
            queryParams: of({ resumeId: '0', mode: 'view'}),
            snapshot: { params: { resumeId: '0', mode: 'view'} },
            url: of([
              new UrlSegment('/', {}),
              new UrlSegment(RouteConstants.RESUMES_ROUTE_PATH, { resumeId: '0', mode: 'view' })
            ]),
            fragment: of('/' + RouteConstants.RESUMES_ROUTE_PATH)
          }
        },
				{provide: ResumesService},
        { provide: HttpClient, useValue: httpClientSpy }
			],
    })
    .compileComponents();
  });

  beforeEach(() => {
    const expectedResumes: Observable<Resume[]> = of([new Resume(
      '0',
      false,
      new Detail('The resumee'
      , new Person('My first name', 'The family name'
      , new Date(), new Contact('myemail@test.com', '0123456974')
      , new Address('Street is here', 'City', 'France', '59000'))
      , [new SocialNetwork('1dvs894fvzs9ef19', 'fbSocialNetwork', 'FB', 'https://myFB-link/test', 'github.svg')])
    , [new Skill('Sleep', SkillLevelType.EXPERIENCED), new Skill('Jump', SkillLevelType.SKILLFULL), new Skill('Investigation', SkillLevelType.BEGINNER), new Skill('Bargain', SkillLevelType.NOVICE)]
    , ['Doing things 1', 'Doing nothing']
    , [new Language('French', LanguageLevelType.NATIVE_SPEAKER), new Language('English', LanguageLevelType.HIGHLY_PROFICIENT)]
    , 'My profile'
    , [new EmploymentHistory('My job title', 'Fictive company', new Date(), null, 'A city', ['Description 1', 'Description 2']), new EmploymentHistory('My job title extra', 'Fictive company 2', new Date(), new Date(), 'Another city', ['Description extra 1', 'Description extra 2'])]
    , [new Education('The degree', 'The school', new Date(), new Date(), 'The city', undefined), new Education('The degree 2', 'The school 2', new Date(), null, 'Another city', "Graduated for the sake of the country nothing more nothing less. Everyone was happy about this, except for me.")]),
    new Resume(
      '1',
      true,
      new Detail('Another resumee'
      , new Person('My first name', 'The family name'
      , new Date(), new Contact('myemail@test2.com', '0123456974')
      , new Address('Street is here', 'City', 'France', '59000'))
      , [new SocialNetwork('14fsd1fsd16fd1q6sc', 'rasSocialNetwork', 'RAS', 'https://myras-link/test', 'linkedin.svg')])
    , [new Skill('Drink', SkillLevelType.EXPERIENCED), new Skill('Eat', SkillLevelType.SKILLFULL), new Skill('Investigation', SkillLevelType.BEGINNER), new Skill('Bargain', SkillLevelType.NOVICE)]
    , ['Doing multiple things', 'Doing something new']
    , [new Language('English', LanguageLevelType.HIGHLY_PROFICIENT)]
    , 'Another profile what else!?'
    , [new EmploymentHistory('A new job title', 'Fictive company 2', new Date(), null, 'A city', ['Description 1', 'Description 2']), new EmploymentHistory('My job title extra', 'Fictive company 2', new Date(), new Date(), 'Another city', ['Description extra 1', 'Description extra 2'])]
    , [new Education('The specific degree', 'The unknown school', new Date(), new Date(), 'The city', undefined), new Education('The degree 2', 'The school 2', new Date(), null, 'Another city', "Graduated by giving money...")])]);

    httpClientSpy.get.and.returnValue(expectedResumes);
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
