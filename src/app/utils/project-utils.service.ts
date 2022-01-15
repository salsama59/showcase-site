import { Injectable } from '@angular/core';
import { ProjectTypeEnum } from '../enums/project-type-enum';
import { SortOrder } from '../enums/sort-order';
import { Project } from '../models/project.model';

/**
 * Service class providing utility methods to manage project sorting 
 */
@Injectable({
  providedIn: 'root'
})
export class ProjectUtilsService {

  /**
   * Creates an instance of project utils service.
   */
  constructor() { }

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

    if(firstProject.projectTitle === secondProject.projectTitle){
      return result;
    }

    switch (sortOrder) {
      case SortOrder.ASCENDING:
        result = firstProject.projectTitle > secondProject.projectTitle ? 1 : -1;
      break;
      case SortOrder.DESCENDING:
        result = secondProject.projectTitle > firstProject.projectTitle ? 1 : -1;
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
