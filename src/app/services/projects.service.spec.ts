import { TestBed } from '@angular/core/testing';

import { ProjectsService } from './projects.service';

describe('ProjectsService', () => {
  let projectsService: ProjectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    projectsService = TestBed.inject(ProjectsService);
  });

  it('should be created', () => {
    expect(projectsService).toBeTruthy();
  });

  it('should posess six projects', () => {
    expect(projectsService.getProjects()).toHaveSize(6);
  });
});
