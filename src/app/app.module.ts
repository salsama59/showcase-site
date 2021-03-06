import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SocialNetworksService } from './services/social-networks.service';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectsService } from './services/projects.service';
import { FormsModule } from '@angular/forms';
import { ProjectUtilsService } from './utils/project-utils.service';
import { HomeComponent } from './home/home.component';
import { NewsService } from './services/news.service';
import { ProjectComponent } from './projects/project/project.component';
import { ResumeComponent } from './resumes/resume/resume.component';
import { NumberToArrayPipe } from './pipes/number-to-array.pipe';
import { ResumesComponent } from './resumes/resumes.component';
import { PaginationComponent } from './pagination/pagination.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JsonDateInterceptor } from './interceptors/json-date-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProjectsComponent,
    HomeComponent,
    ProjectComponent,
    ResumeComponent,
    NumberToArrayPipe,
    ResumesComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [SocialNetworksService, ProjectsService, ProjectUtilsService, NewsService, { provide: HTTP_INTERCEPTORS, useClass: JsonDateInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
