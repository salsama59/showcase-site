import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteConstants } from './constants/route-constants';
import { HomeComponent } from './home/home.component';
import { ProjectComponent } from './projects/project/project.component';
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
    component: ProjectsComponent
  },
  { path: RouteConstants.PROJECT_VIEW_MODE_ROUTE_PATH, 
    component: ProjectComponent 
  }
];

/**
 * This class represent the application routing module.
 */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
