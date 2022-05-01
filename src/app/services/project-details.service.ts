import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BackendEndpointConstants } from '../constants/backend-endpoint-constants';
import { ProjectDetail } from '../models/project-detail.model';

/**
 * The project details service class providing method to manage the project details.
 */
@Injectable({
  providedIn: 'root'
})
export class ProjectDetailsService {

  /**
   * Creates an instance of project details service.
   */
  constructor(private httpClient: HttpClient) {}

  /**
   * Gets the project details list
   * @returns project details 
   */
  getProjectDetails(): Observable<Array<ProjectDetail>> {
    return this.httpClient.get<ProjectDetail[]>(environment.showcaseBackendUrl + BackendEndpointConstants.PROJECT_DETAILS_ENDPOINT_URI, {headers: new HttpHeaders({ 'Content-Type': 'application/json' })});
  }

  /**
   * Gets the project detail by project id
   * @param projectId the project id
   * @returns the project detail given a project id 
   */
  getProjectDetailByProjectId(projectId: string): Observable<ProjectDetail> {
    return this.httpClient.get<ProjectDetail>(environment.showcaseBackendUrl + BackendEndpointConstants.PROJECT_DETAILS_ENDPOINT_URI + '/' + projectId , {headers: new HttpHeaders({ 'Content-Type': 'application/json' })});
  }
}
