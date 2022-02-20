import { TestBed } from '@angular/core/testing';
import { LanguageLevelType } from '../enums/language-level-type';
import { SkillLevelType } from '../enums/skill-level-type';

import { EnumUtilsService } from './enum-utils.service';

describe('EnumUtilsService', () => {
  let service: EnumUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnumUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should calculate SkillLevelType enums length', () => {
    const length: number = service.getEnumLength(SkillLevelType);
    expect(length).toBeTruthy();
    expect(length).toBe(5);
  });

  it('should calculate LanguageLevelType enums length', () => {
    const length: number = service.getEnumLength(LanguageLevelType);
    expect(length).toBeTruthy();
    expect(length).toBe(3);
  });
});
