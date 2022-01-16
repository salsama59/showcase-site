import { TestBed } from '@angular/core/testing';

import { NewsService } from './news.service';

describe('NewsService', () => {
  let newsService: NewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    newsService = TestBed.inject(NewsService);
  });

  it('should be created', () => {
    expect(newsService).toBeTruthy();
  });

  it('should posess six projects', () => {
    expect(newsService.getNews()).toHaveSize(4);
  });
});
