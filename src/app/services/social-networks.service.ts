import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BackendEndpointConstants } from '../constants/backend-endpoint-constants';
import { SocialNetwork } from '../models/social-network.model';

/**
 * Service responsible for providing data regarding social networks
 */
@Injectable({
  providedIn: 'root'
})
export class SocialNetworksService {

  /**
   * @constructor
   * Creates an instance of social networks service.
   */
  constructor(private httpClient: HttpClient) {}

  /**
   * Gets social networks
   * @returns social networks 
   */
  getSocialNetworks(): Observable<SocialNetwork[]>{
    return this.httpClient.get<SocialNetwork[]>(environment.showcaseBackendUrl + BackendEndpointConstants.SOCIAL_NETWORK_ENDPOINT_URI, {headers: new HttpHeaders({ 'Content-Type': 'application/json' })});
  }
}
