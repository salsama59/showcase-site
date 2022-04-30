import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BackendEndpointConstants } from '../constants/backend-endpoint-constants';
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
	 * Player list length changed event
	 */
	public projectListLengthChanged: Subject<number> = new Subject<number>();

  /**
   * Creates an instance of projects service.
   * @public
   */
  constructor(private httpClient: HttpClient) {}

  /**
   * Gets the projects
   * @returns the projects list
   * @public
   */
  getProjects(): Observable<Project[]> {
    return this.httpClient.get<Project[]>(environment.showcaseBackendUrl + BackendEndpointConstants.PROJECTS_ENDPOINT_URI, {headers: new HttpHeaders({ 'Content-Type': 'application/json' })});
  }

  /**
   * Gets project by id
   * @param projectId the project id to get
   * @returns a project given an id
   */
  getProjectById(projectId: string): Observable<Project> {
    return this.httpClient.get<Project>(environment.showcaseBackendUrl + BackendEndpointConstants.PROJECTS_ENDPOINT_URI + '/' + projectId, {headers: new HttpHeaders({ 'Content-Type': 'application/json' })});
  }
}
