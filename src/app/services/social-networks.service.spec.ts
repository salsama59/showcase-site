import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { SocialNetwork } from '../models/social-network.model';

import { SocialNetworksService } from './social-networks.service';

describe('SocialNetworksService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let socialNetworksService: SocialNetworksService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({imports: [HttpClientModule], providers: [
      { provide: HttpClient, useValue: httpClientSpy }
    ]});
    socialNetworksService = TestBed.inject(SocialNetworksService);
  });

  it('should be created', () => {
    expect(socialNetworksService).toBeTruthy();
  });

  it('should posess two social networks', (done: DoneFn) => {

    const expectedSocialNetworks: Observable<SocialNetwork[]> = of([
      new SocialNetwork('4ssd4q6f4q', 'des', 'link', 'url', 'image.png'),
      new SocialNetwork('4ssd4q6f4q', 'des', 'link', 'url', 'image.png')
    ]);

    httpClientSpy.get.and.returnValue(expectedSocialNetworks);
    
    socialNetworksService.getSocialNetworks().subscribe(socilaNetworks => {
      expect(socilaNetworks).toHaveSize(2);
      done();
    });
    
  });
});
