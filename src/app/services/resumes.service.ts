import { Injectable } from '@angular/core';
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

/**
 * Resumes service class providing method in order to manage resumes datas
 */
@Injectable({
  providedIn: 'root'
})
export class ResumesService {

  /**
   * Resumes of resumes service
   * @private
   */
  private resumes: Resume[] = []

  /**
   * Creates an instance of resumes service.
   * @public
   * @constructor
   */
  constructor() {
    this.resumes.push(
      new Resume(
        0,
        false,
        new Detail('The resumee'
        , new Person('My first name', 'The family name'
        , new Date(), new Contact('myemail@test.com', '0123456974')
        , new Address('Street is here', 'City', 'France', '59000'))
        , [new SocialNetwork('fbSocialNetwork', 'FB', 'https://myFB-link/test', 'github.svg')])
      , [new Skill('Sleep', SkillLevelType.EXPERIENCED), new Skill('Jump', SkillLevelType.SKILLFULL), new Skill('Investigation', SkillLevelType.BEGINNER), new Skill('Bargain', SkillLevelType.NOVICE)]
      , ['Doing things 1', 'Doing nothing']
      , [new Language('French', LanguageLevelType.NATIVE_SPEAKER), new Language('English', LanguageLevelType.HIGHLY_PROFICIENT)]
      , 'My profile'
      , [new EmploymentHistory('My job title', 'Fictive company', new Date(), null, 'A city', ['Description 1', 'Description 2']), new EmploymentHistory('My job title extra', 'Fictive company 2', new Date(), new Date(), 'Another city', ['Description extra 1', 'Description extra 2'])]
      , [new Education('The degree', 'The school', new Date(), new Date(), 'The city', null), new Education('The degree 2', 'The school 2', new Date(), null, 'Another city', "Graduated for the sake of the country nothing more nothing less. Everyone was happy about this, except for me.")]),
      new Resume(
        1,
        true,
        new Detail('Another resumee'
        , new Person('My first name', 'The family name'
        , new Date(), new Contact('myemail@test2.com', '0123456974')
        , new Address('Street is here', 'City', 'France', '59000'))
        , [new SocialNetwork('rasSocialNetwork', 'RAS', 'https://myras-link/test', 'linkedin.svg')])
      , [new Skill('Drink', SkillLevelType.EXPERIENCED), new Skill('Eat', SkillLevelType.SKILLFULL), new Skill('Investigation', SkillLevelType.BEGINNER), new Skill('Bargain', SkillLevelType.NOVICE)]
      , ['Doing multiple things', 'Doing something new']
      , [new Language('English', LanguageLevelType.HIGHLY_PROFICIENT)]
      , 'Another profile what else!?'
      , [new EmploymentHistory('A new job title', 'Fictive company 2', new Date(), null, 'A city', ['Description 1', 'Description 2']), new EmploymentHistory('My job title extra', 'Fictive company 2', new Date(), new Date(), 'Another city', ['Description extra 1', 'Description extra 2'])]
      , [new Education('The specific degree', 'The unknown school', new Date(), new Date(), 'The city', null), new Education('The degree 2', 'The school 2', new Date(), null, 'Another city', "Graduated by giving money...")])
    );
   }

  /**
   * Gets resumes
   * @returns a resume list
   * @public
   */
  getResumes(): Array<Resume> {
    return this.resumes;
  }

  /**
   * Gets resume by id
   * @param resumeId the resume id to fetch
   * @returns a resume given an id
   * @public
   */
  getResumeById(resumeId: number): Resume | undefined{
    return this.getResumes().find((resume: Resume, index: number) => resume.resumeId === resumeId);
  }
}
