import { Injectable } from '@angular/core';
import { SocialNetwork } from '../models/social-network.model';

/**
 * Service responsible for providing data regarding social networks
 */
@Injectable({
  providedIn: 'root'
})
export class SocialNetworksService {

  /**
   * @private
   * Social networks of social networks service
   */
  private socialNetworks: SocialNetwork[] = [];

  /**
   * @constructor
   * Creates an instance of social networks service.
   */
  constructor() { 
    this.socialNetworks.push(new SocialNetwork("linkedin", "LinkedIn", "https://www.linkedin.com/in/saül-yeponde-3ba27b82", "linkedin.svg"));
    this.socialNetworks.push(new SocialNetwork("github","Git Hub", "https://github.com/salsama59", "github.svg"));
  }

  /**
   * Gets social networks
   * @returns social networks 
   */
  getSocialNetworks(): SocialNetwork[]{
    return this.socialNetworks.slice();
  }
}
