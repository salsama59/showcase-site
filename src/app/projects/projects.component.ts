import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectTechnologyEnum } from '../enums/project-technology-enum';
import { ProjectTypeEnum } from '../enums/project-type-enum';
import { ProjectTechnologyFilter } from '../interfaces/project-technology-filter';
import { ProjectTypeFilter } from '../interfaces/project-type-filter';
import { Project } from '../models/project.model';
import { ProjectsService } from '../services/projects.service';

/**
 * Projects component responsible for managing the project list section
 */
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  /**
   * Project list of projects component
   * @public
   */
  public projectList: Project[] = [];

  /**
   * Project type filters of projects componen
   * @public
   */
  public projectTypeFilters: Array<ProjectTypeFilter> = [];

  /**
   * Project technologies filters of projects component
   * @public
   */
  public projectTechnologiesFilters: Array<ProjectTechnologyFilter> = [];

  /**
   * Creates an instance of projects component.
   * @constructor
   * @param projectService  the projects service
   * @param router the router
   * @param activatedRoute the activated route
   */
  constructor(private projectService: ProjectsService, private router: Router, private activatedRoute: ActivatedRoute) { }

  /**
   * Initialize the project list to diplay on the page.
   * Initialize the different filters.
   */
  ngOnInit(): void {
    this.initializeProjectTypeFilters();
    this.initializeProjectTechnologiesFilters();
    this.projectList = this.projectService.getProjects();
  }


  private initializeProjectTypeFilters(): void {
    this.projectTypeFilters.push({
      filterId: "webDevelopmentFilter",
      projectType: ProjectTypeEnum.WEB_DEVELOPEMENT,
      filterName: "Web development",
      isFilterActive: true
    });

    this.projectTypeFilters.push({
      filterId: "gameDevelopmentFilter",
      projectType: ProjectTypeEnum.GAME_DEVELOPEMENT,
      filterName: "Game development",
      isFilterActive: true
    });
  }

  private initializeProjectTechnologiesFilters(): void {
    this.projectTechnologiesFilters.push({
      filterId: "angularTechnologyFilter",
      projectTechnology: ProjectTechnologyEnum.ANGULAR,
      filterName: "ANGULAR",
      isFilterActive: true
    });

    this.projectTechnologiesFilters.push({
      filterId: "cssTechnologyFilter",
      projectTechnology: ProjectTechnologyEnum.CSS,
      filterName: "CSS",
      isFilterActive: true
    });

    this.projectTechnologiesFilters.push({
      filterId: "cSharpTechnologyFilter",
      projectTechnology: ProjectTechnologyEnum.C_SHARP,
      filterName: "C#",
      isFilterActive: true
    });

    this.projectTechnologiesFilters.push({
      filterId: "dotNetTechnologyFilter",
      projectTechnology: ProjectTechnologyEnum.DOT_NET,
      filterName: ".NET",
      isFilterActive: true
    });

    this.projectTechnologiesFilters.push({
      filterId: "htmlTechnologyFilter",
      projectTechnology: ProjectTechnologyEnum.HTML,
      filterName: "HTML",
      isFilterActive: true
    });

    this.projectTechnologiesFilters.push({
      filterId: "javaTechnologyFilter",
      projectTechnology: ProjectTechnologyEnum.JAVA,
      filterName: "JAVA",
      isFilterActive: true
    });

    this.projectTechnologiesFilters.push({
      filterId: "slick2dTechnologyFilter",
      projectTechnology: ProjectTechnologyEnum.SLICK2D,
      filterName: "SLICK2D",
      isFilterActive: true
    });

    this.projectTechnologiesFilters.push({
      filterId: "unityTechnologyFilter",
      projectTechnology: ProjectTechnologyEnum.UNITY,
      filterName: "UNITY",
      isFilterActive: true
    });
  }

  onViewProjectElement(projectId: number): void {
    void this.router.navigate([projectId, 'view'], {
			relativeTo: this.activatedRoute
		});
  }

  getProjectImagePathByProjectType(projectType: ProjectTypeEnum): string {
    let projectImagePath: string = '';

    switch (projectType) {
      case ProjectTypeEnum.WEB_DEVELOPEMENT:
        projectImagePath = "assets/images/web-development-illustration.png";
        break;
      case ProjectTypeEnum.GAME_DEVELOPEMENT:
        projectImagePath = "assets/images/game-development-illustration.png";
        break;
    }

    return projectImagePath;
  }

  getProjectImageNameByProjectType(projectType: ProjectTypeEnum): string {
    let projectImageName: string = '';

    switch (projectType) {
      case ProjectTypeEnum.WEB_DEVELOPEMENT:
        projectImageName = "web-development-illustration.png";
        break;
      case ProjectTypeEnum.GAME_DEVELOPEMENT:
        projectImageName = "game-development-illustration.png";
        break;
    }

    return projectImageName;
  }

  onProjectFilterChange(): void {
    const selectedProjectTypeFilters: Array<ProjectTypeFilter> = this.projectTypeFilters.filter((projectTypeFilter: ProjectTypeFilter, index: number) => {
      return projectTypeFilter.isFilterActive;
    });

    const selectedProjectTypeFilterEnums: Array<ProjectTypeEnum> = selectedProjectTypeFilters.map((projectTypeFilter: ProjectTypeFilter, index: number) => {
      return projectTypeFilter.projectType;
    });

    const resultingProjectsFilteredByProjectType: Project[] = this.projectService.getProjects().filter((project: Project, index: number) => {
      return selectedProjectTypeFilterEnums.includes(project.projectType);
    });

    const selectedProjectTechnologyFilters: Array<ProjectTechnologyFilter> = this.projectTechnologiesFilters.filter((projectTechnologyFilter: ProjectTechnologyFilter, index: number) => {
      return projectTechnologyFilter.isFilterActive;
    });

    const selectedProjectTechnologyEnums: Array<ProjectTechnologyEnum> = selectedProjectTechnologyFilters.map((projectTechnologyFilter: ProjectTechnologyFilter, index: number) => {
      return projectTechnologyFilter.projectTechnology;
    });

    const resultingProjectsFilteredByProjectTechnologies = [];
    for (const project of resultingProjectsFilteredByProjectType) {
      
      //if any of the selected project technology filter enum is include in the current project technologies tags then the project is ok to be displayed
      if(selectedProjectTechnologyEnums.some(projectTechnologyEnum => project.projectTags.includes(projectTechnologyEnum))){
        resultingProjectsFilteredByProjectTechnologies.push(project);
      }
    }

    this.projectList = resultingProjectsFilteredByProjectTechnologies;
  }
}
