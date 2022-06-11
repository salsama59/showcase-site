import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { ProjectDetail } from '../models/project-detail.model';
import { ProjectMetadatas } from '../models/project-metadatas.model';
import { ScreenRsolutionData } from '../models/screen-resolution-data.model';

import { ProjectDetailsService } from './project-details.service';

describe('ProjectDetailsService', () => {
  let projectDetailsService: ProjectDetailsService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({ providers: [
      { provide: HttpClient, useValue: httpClientSpy }
    ]});
    projectDetailsService = TestBed.inject(ProjectDetailsService);
  });

  it('should be created', () => {
    expect(projectDetailsService).toBeTruthy();
  });

  it('should posess six project details', (done: DoneFn) => {
    const expectedProjectDetails: Observable<ProjectDetail[]> = of([
      new ProjectDetail('0', '0', 'Project 0 details introduction!!!', ['Instruction 1!', 'Instruction 2!', 'Instruction 3!', 'Instruction 4!'], '#/', null),
    new ProjectDetail('1', '1', 'Project 1 details introduction!!!', ['Instruction 1!', 'Instruction 2!', 'Instruction 3!', 'Instruction 4!'], 'the-pitfall/index.html', new ProjectMetadatas(true, true, true, true, ['autoplay', 'fullscreen', 'geolocation', 'microphone', 'camera', 'midi'], new ScreenRsolutionData(100, '%', 640, 'px'))),
    new ProjectDetail('2', '2', 'Project 2 details introduction!!!', ['Instruction 1!', 'Instruction 2!', 'Instruction 3!', 'Instruction 4!'], '#/', null),
    new ProjectDetail('3', '3', 'Project 3 details introduction!!!', ['Instruction 1!', 'Instruction 2!', 'Instruction 3!', 'Instruction 4!'], '#/', null),
    new ProjectDetail('4', '4', 'Project 4 details introduction!!!', ['Instruction 1!', 'Instruction 2!', 'Instruction 3!', 'Instruction 4!'], '#/', null),
    new ProjectDetail('5', '5', 'Project 5 details introduction!!!', ['Instruction 1!', 'Instruction 2!', 'Instruction 3!', 'Instruction 4!'], 'the-pitfall/index.html', new ProjectMetadatas(true, true, true, true, ['autoplay', 'fullscreen', 'geolocation', 'microphone', 'camera', 'midi'], new ScreenRsolutionData(100, '%', 640, 'px')))]);
    httpClientSpy.get.and.returnValue(expectedProjectDetails);
    projectDetailsService.getProjectDetails().subscribe(projectDetails => {
      expect(projectDetails).toHaveSize(6);
      done();
    });
    
  });


  it('should get the first project details', (done: DoneFn) => {
    const expectedProjectDetail: Observable<ProjectDetail> = of(new ProjectDetail('0', '0', 'Project 0 details introduction!!!', ['Instruction 1!', 'Instruction 2!', 'Instruction 3!', 'Instruction 4!'], '#/', null));
    httpClientSpy.get.and.returnValue(expectedProjectDetail);
    projectDetailsService.getProjectDetailByProjectId('0').subscribe(projectDetail => {
      expect(projectDetail.projectDetailId).toEqual('0');
      expect(projectDetail.projectDetailProjectId).toEqual('0');
      done();
    });
  });
});
