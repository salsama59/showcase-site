import { TestBed } from '@angular/core/testing';

import { SocialNetworksService } from './social-networks.service';

describe('SocialNetworksService', () => {
  let socialNetworksService: SocialNetworksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    socialNetworksService = TestBed.inject(SocialNetworksService);
  });

  it('should be created', () => {
    expect(socialNetworksService).toBeTruthy();
  });

  it('should posess two social networks', () => {
    expect(socialNetworksService.getSocialNetworks()).toHaveSize(2);
  });
});
