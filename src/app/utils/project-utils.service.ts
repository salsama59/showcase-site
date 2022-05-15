import { Injectable } from '@angular/core';
import { ProjectsTranslationsConstants } from '../constants/projects-translations-constants';
import { TechnologyNameConstants } from '../constants/technology-name-constants';
import { ProjectTechnologyEnum } from '../enums/project-technology-enum';
import { ProjectTypeEnum } from '../enums/project-type-enum';
import { SortOrder } from '../enums/sort-order';
import { Project } from '../models/project.model';
import { TranslationsService } from '../services/translations.service';

/**
 * Service class providing utility methods to manage project sorting 
 */
@Injectable({
  providedIn: 'root'
})
export class ProjectUtilsService {


  /**
   * Projects translations constants of project utils service
   */
  public projectsTranslationsConstants = ProjectsTranslationsConstants;

  /**
   * @public
   * @constructor
   * Creates an instance of project utils service.
   * @param translationsService the translation service
   */
  constructor(public translationsService: TranslationsService) { }


  /**
   * Gets project image path by project type
   * @param projectType the project type
   * @returns the project image path given a project type
   * @public
   */
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

  /**
   * Gets project image name by project type
   * @param projectType the project type
   * @returns the project image name given a project type
   * @public
   */
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

  /**
   * Gets project type label by project type
   * @param projectType the project type
   * @returns a project type given a project type
   */
  getProjectTypeLabelByProjectType(projectType: ProjectTypeEnum){
    let projectTypeLabel: string = '';

    switch (projectType) {
      case ProjectTypeEnum.WEB_DEVELOPEMENT:
        projectTypeLabel = this.translationsService.get(this.projectsTranslationsConstants.PROJECTS_PAGE_LIST_LABEL_WEB_DEVELOPMENT_KEY);
        break;
      case ProjectTypeEnum.GAME_DEVELOPEMENT:
        projectTypeLabel = this.translationsService.get(this.projectsTranslationsConstants.PROJECTS_PAGE_LIST_LABEL_GAME_DEVELOPMENT_KEY);
        break;
    }

    return projectTypeLabel;
  }

  /**
   * Gets technology label by project technology type
   * @param projectTechnology the project technology
   * @returns a technology label given a technology type
   */
  getTechnologyLabelByProjectTechnologyType(projectTechnology: ProjectTechnologyEnum){
    let projectTechnologyLabel: string = '';

    switch (projectTechnology) {
      case ProjectTechnologyEnum.JAVA:
        projectTechnologyLabel = TechnologyNameConstants.JAVA_TECHNOLOGY_NAME;
        break;
      case ProjectTechnologyEnum.HTML:
        projectTechnologyLabel = TechnologyNameConstants.HTML_TECHNOLOGY_NAME;
        break;
      case ProjectTechnologyEnum.CSS:
        projectTechnologyLabel = TechnologyNameConstants.CSS_TECHNOLOGY_NAME;
        break;
      case ProjectTechnologyEnum.ANGULAR:
        projectTechnologyLabel = TechnologyNameConstants.ANGULAR_TECHNOLOGY_NAME;
        break;
      case ProjectTechnologyEnum.C_SHARP:
        projectTechnologyLabel = TechnologyNameConstants.C_SHARP_TECHNOLOGY_NAME;
        break;
      case ProjectTechnologyEnum.UNITY:
        projectTechnologyLabel = TechnologyNameConstants.UNITY_TECHNOLOGY_NAME;
        break;
      case ProjectTechnologyEnum.SLICK2D:
        projectTechnologyLabel = TechnologyNameConstants.SLICK2D_TECHNOLOGY_NAME;
        break;
      case ProjectTechnologyEnum.DOT_NET:
        projectTechnologyLabel = TechnologyNameConstants.DOT_NET_TECHNOLOGY_NAME;
        break;
    }

    return projectTechnologyLabel;
  }

  /**
   * Sorts by project creation date
   * @param firstProject the first project to compare
   * @param secondProject the second project to compare
   * @param sortOrder the sort order
   * @returns the comparison result beetween the projects creation date
   * @public
   */
   public sortByProjectCreationDate(firstProject: Project, secondProject: Project, sortOrder: SortOrder){
    let result: number = 0;

    if(firstProject.projectCreationDate.getTime() === secondProject.projectCreationDate.getTime()){
      return result;
    }

    switch (sortOrder) {
      case SortOrder.ASCENDING:
        result = firstProject.projectCreationDate.getTime() > secondProject.projectCreationDate.getTime() ? 1 : -1;
      break;
      case SortOrder.DESCENDING:
        result = secondProject.projectCreationDate.getTime() > firstProject.projectCreationDate.getTime() ? 1 : -1;
      break;
    }

    return result;
  }

  /**
   * Sorts by project last modified date
   * @param firstProject the first project to compare
   * @param secondProject the second project to compare
   * @param sortOrder the sort order
   * @returns the comparison result beetween the projects last modified date
   * @public
   */
   public sortByProjectLastModifiedDate(firstProject: Project, secondProject: Project, sortOrder: SortOrder){
    let result: number = 0;

    if(firstProject.projectLastModifiedDate.getTime() === secondProject.projectLastModifiedDate.getTime()){
      return result;
    }

    switch (sortOrder) {
      case SortOrder.ASCENDING:
        result = firstProject.projectLastModifiedDate.getTime() > secondProject.projectLastModifiedDate.getTime() ? 1 : -1;
      break;
      case SortOrder.DESCENDING:
        result = secondProject.projectLastModifiedDate.getTime() > firstProject.projectLastModifiedDate.getTime() ? 1 : -1;
      break;
    }
    return result;
  }

  /**
   * Sorts by project title
   * @param firstProject the first project to compare
   * @param secondProject the second project to compare
   * @param sortOrder the sort order
   * @returns the comparison result beetween the projects title
   * @public
   */
   public sortByProjectTitle(firstProject: Project, secondProject: Project, sortOrder: SortOrder){
    let result: number = 0;

    if(firstProject.projectTitleTranslationKey === secondProject.projectTitleTranslationKey){
      return result;
    }

    switch (sortOrder) {
      case SortOrder.ASCENDING:
        result = firstProject.projectTitleTranslationKey > secondProject.projectTitleTranslationKey ? 1 : -1;
      break;
      case SortOrder.DESCENDING:
        result = secondProject.projectTitleTranslationKey > firstProject.projectTitleTranslationKey ? 1 : -1;
      break;
    }
    return result;
  }

  /**
   * Sorts by project type
   * @param firstProject the first project to compare
   * @param secondProject the second project to compare
   * @param sortOrder the sort order
   * @returns the comparison result beetween the projects type
   * @public
   */
   public sortByProjectType(firstProject: Project, secondProject: Project, sortOrder: SortOrder){
    let result: number = 0;

    if(ProjectTypeEnum[firstProject.projectType] ===  ProjectTypeEnum[secondProject.projectType]){
      return result;
    }

    switch (sortOrder) {
      case SortOrder.ASCENDING:
        result = ProjectTypeEnum[firstProject.projectType] > ProjectTypeEnum[secondProject.projectType] ? 1 : -1;
      break;
      case SortOrder.DESCENDING:
        result = ProjectTypeEnum[secondProject.projectType] > ProjectTypeEnum[firstProject.projectType] ? 1 : -1;
      break;
    }

    return result;
  }
}
