import { Injectable } from '@angular/core';
import { NewsType } from '../enums/news-type';
import { News } from '../models/news.model';

/**
 * News service providing method to manage news datas.
 */
@Injectable({
  providedIn: 'root'
})
export class NewsService {

  /**
   * News of news service
   * @private
   */
  private news: Array<News> = [];

  /**
   * Creates an instance of news service.
   */
  constructor() {
    this.news.push(new News(0, 'Great news something is now created!!!', NewsType.CREATE, new Date(2022, 0, 15), true));
    this.news.push(new News(0, 'Great news something is now updated!!!', NewsType.UPDATE, new Date(2022, 0, 16), true));
    this.news.push(new News(0, 'Great news another thing is now created!!!', NewsType.CREATE, new Date(2021, 3, 10), false));
    this.news.push(new News(0, 'Great news another thing is now updated!!!', NewsType.UPDATE, new Date(2019, 5, 11), false));
  }

  /**
   * Gets news
   * @returns news 
   */
  getNews(): Array<News> {
    return this.news.slice();
  }
}
