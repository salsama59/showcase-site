import { Injectable } from '@angular/core';
import { ProjectTechnologyEnum } from '../enums/project-technology-enum';
import { ProjectTypeEnum } from '../enums/project-type-enum';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  private projects: Project[] = [];
  constructor() { 
    this.projects.push(new Project(0, "Project 0 title", "This is the project 0 what else is there to say.", ProjectTypeEnum.WEB_DEVELOPEMENT, [ProjectTechnologyEnum.JAVA, ProjectTechnologyEnum.HTML, ProjectTechnologyEnum.CSS]));
    this.projects.push(new Project(1, "Project 1 title", "This is the project 1 what else is there to say.", ProjectTypeEnum.GAME_DEVELOPEMENT, [ProjectTechnologyEnum.JAVA, ProjectTechnologyEnum.SLICK2D]));
    this.projects.push(new Project(2, "Project 2 title", "This is the project 2 what else is there to say.", ProjectTypeEnum.WEB_DEVELOPEMENT, [ProjectTechnologyEnum.JAVA, ProjectTechnologyEnum.HTML, ProjectTechnologyEnum.CSS, ProjectTechnologyEnum.ANGULAR]));
    this.projects.push(new Project(3, "Project 3 title", "This is the project 3 what else is there to say.", ProjectTypeEnum.WEB_DEVELOPEMENT, [ProjectTechnologyEnum.C_SHARP, ProjectTechnologyEnum.HTML, ProjectTechnologyEnum.CSS, ProjectTechnologyEnum.DOT_NET]));
    this.projects.push(new Project(4, "Project 4 title", "This is the project 4 what else is there to say.", ProjectTypeEnum.WEB_DEVELOPEMENT, [ProjectTechnologyEnum.JAVA, ProjectTechnologyEnum.HTML, ProjectTechnologyEnum.CSS]));
    this.projects.push(new Project(5, "Project 5 title", "This is the project 5 what else is there to say.", ProjectTypeEnum.GAME_DEVELOPEMENT, [ProjectTechnologyEnum.C_SHARP, ProjectTechnologyEnum.UNITY]));
  }

  getProjects(): Project[] {
    return this.projects.slice();
  }
}
