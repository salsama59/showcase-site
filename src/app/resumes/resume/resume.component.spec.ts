import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Observable } from 'rxjs';
import { RouteConstants } from 'src/app/constants/route-constants';
import { LanguageLevelType } from 'src/app/enums/language-level-type';
import { SkillLevelType } from 'src/app/enums/skill-level-type';
import { HomeComponent } from 'src/app/home/home.component';
import { Address } from 'src/app/models/address.model';
import { Contact } from 'src/app/models/contact.model';
import { Detail } from 'src/app/models/detail.model';
import { Education } from 'src/app/models/education.model';
import { EmploymentHistory } from 'src/app/models/employment-history.model';
import { Language } from 'src/app/models/language.model';
import { Person } from 'src/app/models/person.model';
import { Resume } from 'src/app/models/resume.model';
import { Skill } from 'src/app/models/skill.model';
import { SocialNetwork } from 'src/app/models/social-network.model';
import { NumberToArrayPipe } from 'src/app/pipes/number-to-array.pipe';
import { ProjectComponent } from 'src/app/projects/project/project.component';
import { ProjectsComponent } from 'src/app/projects/projects.component';
import { ResumesService } from 'src/app/services/resumes.service';
import { ResumesComponent } from '../resumes.component';
import { ResumeComponent } from './resume.component';

describe('ResumeComponent', () => {
  let component: ResumeComponent;
  let fixture: ComponentFixture<ResumeComponent>;
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
      declarations: [ ResumeComponent, NumberToArrayPipe ],
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
    const expectedResume: Observable<Resume> = of(
      new Resume(
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
      , [new Education('The degree', 'The school', new Date(), new Date(), 'The city', null), new Education('The degree 2', 'The school 2', new Date(), null, 'Another city', "Graduated for the sake of the country nothing more nothing less. Everyone was happy about this, except for me.")])
      );

    httpClientSpy.get.and.returnValue(expectedResume);
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
