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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProjectsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [SocialNetworksService, ProjectsService, ProjectUtilsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
