import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { ProjectTechnologyEnum } from '../enums/project-technology-enum';
import { ProjectTypeEnum } from '../enums/project-type-enum';
import { ProjectDetail } from '../models/project-detail.model';
import { Project } from '../models/project.model';

import { ProjectsService } from './projects.service';

describe('ProjectsService', () => {
  let projectsService: ProjectsService;

  beforeEach(() => {
    let httpClientSpy: jasmine.SpyObj<HttpClient>;
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    const expectedProjects: Observable<Project[]> = of([
      new Project('0', "Project 0 title", "This is the project 0 what else is there to say.", ProjectTypeEnum.WEB_DEVELOPEMENT, [ProjectTechnologyEnum.JAVA, ProjectTechnologyEnum.HTML, ProjectTechnologyEnum.CSS], new Date(2019,10, 20), new Date()),
      new Project('1', "Project 1 title", "This is the project 1 what else is there to say.", ProjectTypeEnum.GAME_DEVELOPEMENT, [ProjectTechnologyEnum.JAVA, ProjectTechnologyEnum.SLICK2D], new Date(2014, 5, 11), new Date(2015, 8, 20)),
      new Project('2', "Project 2 title", "This is the project 2 what else is there to say.", ProjectTypeEnum.WEB_DEVELOPEMENT, [ProjectTechnologyEnum.JAVA, ProjectTechnologyEnum.HTML, ProjectTechnologyEnum.CSS, ProjectTechnologyEnum.ANGULAR], new Date(2021,0, 10), new Date(2022,0, 10)),
      new Project('3', "Project 3 title", "This is the project 3 what else is there to say.", ProjectTypeEnum.WEB_DEVELOPEMENT, [ProjectTechnologyEnum.C_SHARP, ProjectTechnologyEnum.HTML, ProjectTechnologyEnum.CSS, ProjectTechnologyEnum.DOT_NET], new Date(2010,11, 6), new Date(2011,10, 6)),
      new Project('4', "Project 4 title", "This is the project 4 what else is there to say.", ProjectTypeEnum.WEB_DEVELOPEMENT, [ProjectTechnologyEnum.JAVA, ProjectTechnologyEnum.HTML, ProjectTechnologyEnum.CSS], new Date(2009,10, 20), new Date(2018,11, 24)),
      new Project('5', "Project 5 title", "This is the project 5 what else is there to say.", ProjectTypeEnum.GAME_DEVELOPEMENT, [ProjectTechnologyEnum.C_SHARP, ProjectTechnologyEnum.UNITY], new Date(2000, 8, 20), new Date(2021, 8, 20))
    ]);
 
    httpClientSpy.get.and.returnValue(expectedProjects);
    TestBed.configureTestingModule({ providers: [
      { provide: HttpClient, useValue: httpClientSpy }
    ]});
    projectsService = TestBed.inject(ProjectsService);
  });

  it('should be created', () => {
    expect(projectsService).toBeTruthy();
  });

  it('should posess six projects', (done: DoneFn) => {
    projectsService.getProjects().subscribe(projects => {
      expect(projects).toHaveSize(6);
      done();
    })
    
  });
});
