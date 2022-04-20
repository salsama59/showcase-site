import { HttpClient, HttpClientModule } from '@angular/common/http';
import { async, TestBed, waitForAsync } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { NewsType } from '../enums/news-type';
import { News } from '../models/news.model';

import { NewsService } from './news.service';

describe('NewsService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let newsService: NewsService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({ providers: [
      { provide: HttpClient, useValue: httpClientSpy }
    ]});
    
    newsService = TestBed.inject(NewsService);
  });

  it('should be created', () => {
    expect(newsService).toBeTruthy();
  });

  it('should posess six projects', (done: DoneFn) => {
    const expectedNews: Observable<News[]> = of([
      new News('4ssd4q6f4q', 'des', NewsType.CREATE, new Date(), true),
      new News('4ssd4q6f4q', 'des', NewsType.CREATE, new Date(), true),
      new News('4ssd4q6f4q', 'des', NewsType.CREATE, new Date(), true),
      new News('4ssd4q6f4q', 'des', NewsType.CREATE, new Date(), true)
    ]);

    httpClientSpy.get.and.returnValue(expectedNews);

    newsService.getNews().subscribe(news => {
      expect(news).toHaveSize(4);
      done();
    });
  });
});
