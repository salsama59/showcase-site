import { Injectable } from '@angular/core';
import { ProjectTechnologyEnum } from '../enums/project-technology-enum';
import { ProjectTypeEnum } from '../enums/project-type-enum';
import { Project } from '../models/project.model';

/**
 * Project service class providing method in order to manage projects datas
 */
@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  /**
   * Projects  of projects service
   * @private
   */
  private projects: Project[] = [];

  /**
   * Creates an instance of projects service.
   * @public
   */
  constructor() { 
    this.projects.push(new Project(0, "Project 0 title", "This is the project 0 what else is there to say.", ProjectTypeEnum.WEB_DEVELOPEMENT, [ProjectTechnologyEnum.JAVA, ProjectTechnologyEnum.HTML, ProjectTechnologyEnum.CSS], new Date(2019,10, 20), new Date()));
    this.projects.push(new Project(1, "Project 1 title", "This is the project 1 what else is there to say.", ProjectTypeEnum.GAME_DEVELOPEMENT, [ProjectTechnologyEnum.JAVA, ProjectTechnologyEnum.SLICK2D], new Date(2014, 5, 11), new Date(2015, 8, 20)));
    this.projects.push(new Project(2, "Project 2 title", "This is the project 2 what else is there to say.", ProjectTypeEnum.WEB_DEVELOPEMENT, [ProjectTechnologyEnum.JAVA, ProjectTechnologyEnum.HTML, ProjectTechnologyEnum.CSS, ProjectTechnologyEnum.ANGULAR], new Date(2021,0, 10), new Date(2022,0, 10)));
    this.projects.push(new Project(3, "Project 3 title", "This is the project 3 what else is there to say.", ProjectTypeEnum.WEB_DEVELOPEMENT, [ProjectTechnologyEnum.C_SHARP, ProjectTechnologyEnum.HTML, ProjectTechnologyEnum.CSS, ProjectTechnologyEnum.DOT_NET], new Date(2010,11, 6), new Date(2011,10, 6)));
    this.projects.push(new Project(4, "Project 4 title", "This is the project 4 what else is there to say.", ProjectTypeEnum.WEB_DEVELOPEMENT, [ProjectTechnologyEnum.JAVA, ProjectTechnologyEnum.HTML, ProjectTechnologyEnum.CSS], new Date(2009,10, 20), new Date(2018,11, 24)));
    this.projects.push(new Project(5, "Project 5 title", "This is the project 5 what else is there to say.", ProjectTypeEnum.GAME_DEVELOPEMENT, [ProjectTechnologyEnum.C_SHARP, ProjectTechnologyEnum.UNITY], new Date(2000, 8, 20), new Date(2021, 8, 20)));
  }

  /**
   * Gets the projects
   * @returns the projects list
   * @public
   */
  getProjects(): Project[] {
    return this.projects.slice();
  }

  /**
   * Gets project by id
   * @param projectId the project id to get
   * @returns a project given an id
   */
  getProjectById(projectId: number): Project | undefined {
    return this.getProjects().find((project: Project, index: number) => project.projectId === projectId);
  }
}
