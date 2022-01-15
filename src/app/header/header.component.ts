import { Component } from '@angular/core';
import { RouteConstants } from '../constants/route-constants';

/**
 * Header component class managing the header element behaviour
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {


  /**
   * Route constants of header component
   */
  public routeConstants = RouteConstants;

  /**
   * Creates an instance of header component.
   */
  constructor() { }
}
