import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteConstants } from './constants/route-constants';
import { HomeComponent } from './home/home.component';
import { ProjectComponent } from './projects/project/project.component';
import { ProjectsComponent } from './projects/projects.component';
import { LocalesResolver } from './resolvers/locales.resolver';
import { TranslationsResolver } from './resolvers/translations.resolver';
import { ResumeComponent } from './resumes/resume/resume.component';
import { ResumesComponent } from './resumes/resumes.component';

/**
 * The application routes array
 * @type {Routes}
 * @public
 */
const routes: Routes = [
  {
    path: RouteConstants.HOME_ROUTE_PATH,
    component: HomeComponent,
    resolve: [TranslationsResolver, LocalesResolver]
  },
  {
    path: RouteConstants.PROJECTS_ROUTE_PATH,
    component: ProjectsComponent,
    resolve: [TranslationsResolver, LocalesResolver]
  },
  { path: RouteConstants.PROJECT_VIEW_MODE_ROUTE_PATH, 
    component: ProjectComponent,
    resolve: [TranslationsResolver, LocalesResolver]
  },
  { path: RouteConstants.RESUMES_ROUTE_PATH, 
    component: ResumesComponent,
    resolve: [TranslationsResolver, LocalesResolver], children: [
      { path: RouteConstants.RESUME_VIEW_MODE_ROUTE_PATH, component: ResumeComponent }
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
export class AppRoutingModule {}
