import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RouteModeConstants } from '../constants/route-mode-constants';
import { TechnologyNameConstants } from '../constants/technology-name-constants';
import { ProjectSortType } from '../enums/project-sort-type';
import { ProjectTechnologyEnum } from '../enums/project-technology-enum';
import { ProjectTypeEnum } from '../enums/project-type-enum';
import { SortOrder } from '../enums/sort-order';
import { ProjectTechnologyFilter } from '../interfaces/project-technology-filter';
import { ProjectTypeFilter } from '../interfaces/project-type-filter';
import { Project } from '../models/project.model';
import { ProjectsService } from '../services/projects.service';
import { ProjectUtilsService } from '../utils/project-utils.service';

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
   * User sort choice of projects component
   * @public
   */
  public userSortChoice: ProjectSortType = ProjectSortType.CREATION_DATE;

  /**
   * User sort order choice of projects component
   * @public
   */
  public userSortOrderChoice: SortOrder = SortOrder.ASCENDING;

  /**
   * Project sort type of projects component
   * @public
   */
  public projectSortType = ProjectSortType;

  /**
   * Sort label of projects component
   * @public
   */
  public sortLabel: string = "ASC";

  /**
	 * Maximum projects per page count
	 */
	public maximumProjectsPerPageCount: number = 4;

  /**
	 * Current project page number
	 */
	private currentProjectPage: number = 1;

  /**
   * Creates an instance of projects component.
   * @constructor
   * @param projectsService  the projects service
   * @param router the router
   * @param activatedRoute the activated route
   * @param projectUtilsService the project utility service
   */
  constructor(public projectsService: ProjectsService, private router: Router, private activatedRoute: ActivatedRoute, public projectUtilsService: ProjectUtilsService) { }

  /**
   * Initialize the project list to diplay on the page.
   * Initialize the different filters.
   * Sort the project list with the default configuration
   * Paginate the projects
   * @public
   */
  ngOnInit(): void {
    this.projectList = this.projectsService.getProjects();
    this.paginateProjects('1', null);
		void this.router.navigate([], {
			relativeTo: this.activatedRoute,
			queryParams: { page: '1' }
		});
		this.activatedRoute.queryParams.subscribe((params: Params) => {
      if (params['page']) {
				this.currentProjectPage = +params['page'];
			}
      if(this.projectList.length > 0){
        this.onProjectFilterChange(true);
      }
			this.paginateProjects(params['page'], this.projectList.length > 0 ? this.projectList : null);
		});
    this.initializeProjectTypeFilters();
    this.initializeProjectTechnologiesFilters();
    this.onSortChoiceChange(true);
  }


  /**
   * Initializes the project type filters
   * @private
   */
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

  /**
   * Initializes the project technologies filters
   * @private
   */
  private initializeProjectTechnologiesFilters(): void {
    this.projectTechnologiesFilters.push({
      filterId: "angularTechnologyFilter",
      projectTechnology: ProjectTechnologyEnum.ANGULAR,
      filterName: this.projectUtilsService.getTechnologyLabelByProjectTechnologyType(ProjectTechnologyEnum.ANGULAR),
      isFilterActive: true
    });

    this.projectTechnologiesFilters.push({
      filterId: "cssTechnologyFilter",
      projectTechnology: ProjectTechnologyEnum.CSS,
      filterName: this.projectUtilsService.getTechnologyLabelByProjectTechnologyType(ProjectTechnologyEnum.CSS),
      isFilterActive: true
    });

    this.projectTechnologiesFilters.push({
      filterId: "cSharpTechnologyFilter",
      projectTechnology: ProjectTechnologyEnum.C_SHARP,
      filterName: this.projectUtilsService.getTechnologyLabelByProjectTechnologyType(ProjectTechnologyEnum.C_SHARP),
      isFilterActive: true
    });

    this.projectTechnologiesFilters.push({
      filterId: "dotNetTechnologyFilter",
      projectTechnology: ProjectTechnologyEnum.DOT_NET,
      filterName: this.projectUtilsService.getTechnologyLabelByProjectTechnologyType(ProjectTechnologyEnum.DOT_NET),
      isFilterActive: true
    });

    this.projectTechnologiesFilters.push({
      filterId: "htmlTechnologyFilter",
      projectTechnology: ProjectTechnologyEnum.HTML,
      filterName: this.projectUtilsService.getTechnologyLabelByProjectTechnologyType(ProjectTechnologyEnum.HTML),
      isFilterActive: true
    });

    this.projectTechnologiesFilters.push({
      filterId: "javaTechnologyFilter",
      projectTechnology: ProjectTechnologyEnum.JAVA,
      filterName: this.projectUtilsService.getTechnologyLabelByProjectTechnologyType(ProjectTechnologyEnum.JAVA),
      isFilterActive: true
    });

    this.projectTechnologiesFilters.push({
      filterId: "slick2dTechnologyFilter",
      projectTechnology: ProjectTechnologyEnum.SLICK2D,
      filterName: this.projectUtilsService.getTechnologyLabelByProjectTechnologyType(ProjectTechnologyEnum.SLICK2D),
      isFilterActive: true
    });

    this.projectTechnologiesFilters.push({
      filterId: "unityTechnologyFilter",
      projectTechnology: ProjectTechnologyEnum.UNITY,
      filterName: this.projectUtilsService.getTechnologyLabelByProjectTechnologyType(ProjectTechnologyEnum.UNITY),
      isFilterActive: true
    });
  }

  /**
   * Determines what happens when the view project button is clicked
   * @param projectId the desired project id 
   * @public
   */
  onViewProjectElement(projectId: number): void {
    void this.router.navigate([projectId, RouteModeConstants.MODE_VIEW_CONSTANT], {
			relativeTo: this.activatedRoute
		});
  }

  

  /**
   * Determines what happens when the project filter value change
   * @param isSortAllowed the sort activation flag
   * @public
   */
  onProjectFilterChange(isSortAllowed: boolean): void {
    const selectedProjectTypeFilters: Array<ProjectTypeFilter> = this.projectTypeFilters.filter((projectTypeFilter: ProjectTypeFilter, index: number) => {
      return projectTypeFilter.isFilterActive;
    });

    const selectedProjectTypeFilterEnums: Array<ProjectTypeEnum> = selectedProjectTypeFilters.map((projectTypeFilter: ProjectTypeFilter, index: number) => {
      return projectTypeFilter.projectType;
    });

    let resultingProjectsFilteredByProjectType : Project[] = [];

    if(isSortAllowed) {
      resultingProjectsFilteredByProjectType = this.projectsService.getProjects().filter((project: Project, index: number) => {
        return selectedProjectTypeFilterEnums.includes(project.projectType);
      });
    } else {
      resultingProjectsFilteredByProjectType = this.projectList.filter((project: Project, index: number) => {
        return selectedProjectTypeFilterEnums.includes(project.projectType);
      });
    }
    
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
    this.projectsService.projectListLengthChanged.next(this.projectList.length);
    if(isSortAllowed){
      this.onSortChoiceChange(false);
    }
    
    this.paginateProjects(this.currentProjectPage, this.projectList);
  }

  /**
   * Determines what happens when sort order button is clicked
   * @public
   */
  onSortOrderUpdate(): void {
    switch (this.userSortOrderChoice) {
      case SortOrder.ASCENDING:
        this.userSortOrderChoice = SortOrder.DESCENDING;
        this.sortLabel = "DESC";
      break;
      case SortOrder.DESCENDING:
        this.userSortOrderChoice = SortOrder.ASCENDING;
        this.sortLabel = "ASC";
      break;
    }
    this.onSortChoiceChange(true);
  }


  /**
   * Determines what happens when the sort dropdown value change
   * @param isFilterAllowed the fliter activation flag
   * @public
   */
  onSortChoiceChange(isFilterAllowed: boolean): void {

    let listToUpdate: Project[] = [];

    if(isFilterAllowed) {
      listToUpdate = this.projectsService.getProjects();
    } else {
      listToUpdate = this.projectList;
    }

    switch (this.userSortChoice) {
      case ProjectSortType.CREATION_DATE:
        this.projectList = listToUpdate.sort((firstProject: Project, secondProject: Project) => {
          return this.projectUtilsService.sortByProjectCreationDate(firstProject, secondProject, this.userSortOrderChoice);
        });
      break;
      case ProjectSortType.PROJECT_TYPE:
        this.projectList = listToUpdate.sort((firstProject: Project, secondProject: Project) => {
          return this.projectUtilsService.sortByProjectType(firstProject, secondProject, this.userSortOrderChoice);
        });
      break;
      case ProjectSortType.TITLE:
        this.projectList = listToUpdate.sort((firstProject: Project, secondProject: Project) => {
          return this.projectUtilsService.sortByProjectTitle(firstProject, secondProject, this.userSortOrderChoice);
        });
      break;
      case ProjectSortType.LAST_MODIFIED:
        this.projectList = listToUpdate.sort((firstProject: Project, secondProject: Project) => {
          return this.projectUtilsService.sortByProjectLastModifiedDate(firstProject, secondProject, this.userSortOrderChoice);
        });
      break;
    }

    if(isFilterAllowed){
      this.onProjectFilterChange(false);
    }
  }

  /**
	 * Paginates the project list given a page number and a project list.
	 * @param pageNumber the page number.
   * @param updatedProjectList the updated project list
	 */
	paginateProjects(pageNumber: string | number | undefined | null, updatedProjectList: Project[] | null): void {
		if (pageNumber) {
      let currentProjectListLength: number = 0;

      if(updatedProjectList){
        currentProjectListLength = updatedProjectList.length;
      } else {
        currentProjectListLength = this.projectsService.getProjects().length
      }

			let newPageTotal: number = Math.ceil(
				currentProjectListLength / this.maximumProjectsPerPageCount
			);

			if (newPageTotal === 0) {
				newPageTotal = 1;
			}

			if (newPageTotal < +pageNumber) {
				pageNumber = newPageTotal.toString();
			}

			const start: number =
				this.maximumProjectsPerPageCount * +pageNumber -
				this.maximumProjectsPerPageCount;
			const end: number = this.maximumProjectsPerPageCount * +pageNumber;
      if(updatedProjectList) {
        this.projectList = updatedProjectList.slice(start, end);
      } else {
        this.projectList = this.projectsService.getProjects().slice(start, end);
      }
		}
	}

  /**
   * Gets project list length
   * @returns the project list length
   */
  getProjectListLength(): number {
    if(this.projectList.length > 0){
      return this.projectList.length;
    } else {
      return this.projectsService.getProjects().length;
    }
  }
}
