import { TestBed } from '@angular/core/testing';

import { ProjectDetailsService } from './project-details.service';

describe('ProjectDetailsService', () => {
  let projectDetailsService: ProjectDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    projectDetailsService = TestBed.inject(ProjectDetailsService);
  });

  it('should be created', () => {
    expect(projectDetailsService).toBeTruthy();
  });

  it('should posess six project details', () => {
    expect(projectDetailsService.getProjectDetails()).toHaveSize(6);
  });


  it('should get the first project details', () => {
    expect(projectDetailsService.getProjectDetailByProjectId(0)?.projectDetailId).toEqual(0);
    expect(projectDetailsService.getProjectDetailByProjectId(0)?.projectDetailProjectId).toEqual(0);
  });
});
