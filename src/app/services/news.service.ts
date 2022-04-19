import { Injectable } from '@angular/core';
import { News } from '../models/news.model';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BackendEndpointConstants } from '../constants/backend-endpoint-constants';

/**
 * News service providing method to manage news datas.
 */
@Injectable({
  providedIn: 'root'
})
export class NewsService {
  /**
   * Creates an instance of news service.
   */
  constructor(private httpClient: HttpClient) {}

  /**
   * Gets news
   * @returns an observable of News 
   */
  getNews(): Observable<Array<News>> {
    return this.httpClient.get<News[]>(environment.showcaseBackendUrl + BackendEndpointConstants.NEWS_ENDPOINT_URI, {headers: new HttpHeaders({ 'Content-Type': 'application/json' })});
  }
}
