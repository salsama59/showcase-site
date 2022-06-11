import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { LanguageLevelType } from '../enums/language-level-type';
import { SkillLevelType } from '../enums/skill-level-type';
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

import { ResumesService } from './resumes.service';

describe('ResumesService', () => {
  let service: ResumesService;

  beforeEach(() => {
    let httpClientSpy: jasmine.SpyObj<HttpClient>;
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

    const expectedResume: Observable<Resume> = of(new Resume(
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
    , [new Education('The degree', 'The school', new Date(), new Date(), 'The city', undefined), new Education('The degree 2', 'The school 2', new Date(), null, 'Another city', "Graduated for the sake of the country nothing more nothing less. Everyone was happy about this, except for me.")]))
    httpClientSpy.get.and.returnValue(expectedResume);

    TestBed.configureTestingModule({providers: [
      { provide: HttpClient, useValue: httpClientSpy }
    ]});
    service = TestBed.inject(ResumesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should posess 2 resumes', () => {
    expect(service.getResumes()).toHaveSize(2);
  });

  it('should get a resume by id', (done: DoneFn) => {
    service.getResumeById('0').subscribe(resume => {
      expect(resume).toBeTruthy();
      expect(resume?.resumeId).toBe('0');
      done();
    });
    
  });
});
