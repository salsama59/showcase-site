import { TestBed } from '@angular/core/testing';
import { Resume } from '../models/resume.model';

import { ResumesService } from './resumes.service';

describe('ResumesService', () => {
  let service: ResumesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResumesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should posess 2 resumes', () => {
    expect(service.getResumes()).toHaveSize(2);
  });

  it('should get a resume by id', () => {
    const resume: Resume | undefined = service.getResumeById(0);
    expect(resume).toBeTruthy();
    expect(resume?.resumeId).toBe(0);
  });
});
