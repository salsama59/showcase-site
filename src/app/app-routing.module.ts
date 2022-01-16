import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteConstants } from './constants/route-constants';
import { HomeComponent } from './home/home.component';
import { ProjectsComponent } from './projects/projects.component';

/**
 * The application routes array
 * @type {Routes}
 * @public
 */
const routes: Routes = [
  {
    path: RouteConstants.HOME_ROUTE_PATH,
    component: HomeComponent
  },
  {
    path: RouteConstants.PROJECTS_ROUTE_PATH,
    component: ProjectsComponent,
    children: [
      // { path: ':teamId/:mode', component: TeamComponent },
      // { path: ':mode', component: TeamComponent }
    ]
  }
  
];

/**
 * This class represent the application routing module.
 */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
