import { Injectable } from '@angular/core';
import { ProjectDetail } from '../models/project-detail.model';
import { ProjectMetadatas } from '../models/project-metadatas.model';
import { ScreenRsolutionData } from '../models/screen-resolution-data.model';

/**
 * The project details service class providing method to manage the project details.
 */
@Injectable({
  providedIn: 'root'
})
export class ProjectDetailsService {

  /**
   * Project details of project details service
   */
  projectDetails: Array<ProjectDetail> = [];

  /**
   * Creates an instance of project details service.
   */
  constructor() { 
    this.projectDetails.push(new ProjectDetail(0, 0, 'Project 0 details introduction!!!', ['Instruction 1!', 'Instruction 2!', 'Instruction 3!', 'Instruction 4!'], '#/', null));
    this.projectDetails.push(new ProjectDetail(1, 1, 'Project 1 details introduction!!!', ['Instruction 1!', 'Instruction 2!', 'Instruction 3!', 'Instruction 4!'], 'the-pitfall/index.html', new ProjectMetadatas(true, true, true, true, ['autoplay', 'fullscreen', 'geolocation', 'microphone', 'camera', 'midi'], new ScreenRsolutionData(100, '%', 640, 'px'))));
    this.projectDetails.push(new ProjectDetail(2, 2, 'Project 2 details introduction!!!', ['Instruction 1!', 'Instruction 2!', 'Instruction 3!', 'Instruction 4!'], '#/', null));
    this.projectDetails.push(new ProjectDetail(3, 3, 'Project 3 details introduction!!!', ['Instruction 1!', 'Instruction 2!', 'Instruction 3!', 'Instruction 4!'], '#/', null));
    this.projectDetails.push(new ProjectDetail(4, 4, 'Project 4 details introduction!!!', ['Instruction 1!', 'Instruction 2!', 'Instruction 3!', 'Instruction 4!'], '#/', null));
    this.projectDetails.push(new ProjectDetail(5, 5, 'Project 5 details introduction!!!', ['Instruction 1!', 'Instruction 2!', 'Instruction 3!', 'Instruction 4!'], 'the-pitfall/index.html', new ProjectMetadatas(true, true, true, true, ['autoplay', 'fullscreen', 'geolocation', 'microphone', 'camera', 'midi'], new ScreenRsolutionData(100, '%', 640, 'px'))));
  }

  /**
   * Gets the project details list
   * @returns project details 
   */
  getProjectDetails(): Array<ProjectDetail> {
    return this.projectDetails.slice();
  }

  /**
   * Gets the project detail by project id
   * @param projectId the project id
   * @returns the project detail given a project id 
   */
  getProjectDetailByProjectId(projectId: number): ProjectDetail | undefined {
    return this.getProjectDetails().find((projectDetail: ProjectDetail, index: number) => projectDetail.projectDetailProjectId === projectId);
  }
}
