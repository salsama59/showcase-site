import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BackendEndpointConstants } from '../constants/backend-endpoint-constants';
import { Resume } from '../models/resume.model';

/**
 * Resumes service class providing method in order to manage resumes datas
 */
@Injectable({
  providedIn: 'root'
})
export class ResumesService {

  /**
   * Creates an instance of resumes service.
   * @public
   * @constructor
   */
  constructor(private httpClient: HttpClient) {}

  /**
   * Gets resumes
   * @returns a resume list
   * @public
   */
  getResumes(): Observable<Array<Resume>> {
    return this.httpClient.get<Resume[]>(environment.showcaseBackendUrl + BackendEndpointConstants.RESUMES_ENDPOINT_URI, {headers: new HttpHeaders({ 'Content-Type': 'application/json' })});
  }

  /**
   * Gets resume by id
   * @param resumeId the resume id to fetch
   * @returns a resume given an id
   * @public
   */
  getResumeById(resumeId: string): Observable<Resume> {
    return this.httpClient.get<Resume>(environment.showcaseBackendUrl + BackendEndpointConstants.RESUMES_ENDPOINT_URI + '/' + resumeId, {headers: new HttpHeaders({ 'Content-Type': 'application/json' })});
  }
}
