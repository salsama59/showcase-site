import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';
import { ProjectTypeEnum } from 'src/app/enums/project-type-enum';
import { ProjectDetail } from 'src/app/models/project-detail.model';
import { ProjectMetadatas } from 'src/app/models/project-metadatas.model';
import { Project } from 'src/app/models/project.model';
import { ProjectDetailsService } from 'src/app/services/project-details.service';
import { ProjectsService } from 'src/app/services/projects.service';

/**
 * The project component class responsible for managing the project detail section
 */
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  /**
   * Current project of project component
   */
  currentProject?: Project;

  /**
   * Current project detail of project component
   */
  currentProjectDetail?: ProjectDetail;

  /**
   * Project type enum of project component
   */
  public projectTypeEnum = ProjectTypeEnum;

  /**
   * Instanciate the projectComponent class
   * @param activatedRoute the activated route
   * @param projectsService the projects service
   * @param projectDetailsService  the project details service
   * @param domSanitizer the dom sanitizer
   */
  constructor(private activatedRoute: ActivatedRoute, private projectsService: ProjectsService, private projectDetailsService: ProjectDetailsService, private domSanitizer: DomSanitizer) { }

  /**
   * Initialize the project component by subscribing to the activated route params, which allows the current project and project detail calculation given the project Id.
   */
  ngOnInit(): void {
    this.activatedRoute.params.subscribe({next: (params: Params) => {
      const currentProjectId: number = +params['projectId'];
      this.currentProject = this.projectsService.getProjectById(currentProjectId);
      this.currentProjectDetail = this.projectDetailsService.getProjectDetailByProjectId(currentProjectId);
    }});
  }

  /**
   * Calculate the current project url depending on the project type, then the url is sanitize to avoid code injection
   * @returns the sanitized url for the project.
   */
  getProjectUrl(): SafeResourceUrl {
    let sanitizedProjectUrl: SafeResourceUrl = '';
    switch (this.currentProject?.projectType) {
      case ProjectTypeEnum.GAME_DEVELOPEMENT:
        if(this.currentProjectDetail){
          sanitizedProjectUrl = this.domSanitizer.bypassSecurityTrustResourceUrl((<ProjectDetail>this.currentProjectDetail).projectUrl);
        }
        break;
      case ProjectTypeEnum.WEB_DEVELOPEMENT:
        if(this.currentProjectDetail){
          sanitizedProjectUrl = this.domSanitizer.bypassSecurityTrustUrl((<ProjectDetail>this.currentProjectDetail).projectUrl);
        }
        break;
    }
    return sanitizedProjectUrl;
  }

  /**
   * Gets the current project permissions
   * @returns the current project permissions 
   */
  getProjectPermissions(): string {
    let projectPermissions: string = '';
    if(this.currentProjectDetail?.projectMetadatas){
      projectPermissions = (<ProjectMetadatas>this.currentProjectDetail.projectMetadatas).permissions.join("; ");
    }
    return projectPermissions;
  }

  /**
   * Gets current project resolution data width
   * @returns the current project resolution data width 
   */
  getProjectResolutionDataWidth(): string {
    let projectResolutionDataWidth: string = '';
    if(this.currentProjectDetail?.projectMetadatas?.screenResolutionData){
      projectResolutionDataWidth = (<ProjectMetadatas>this.currentProjectDetail.projectMetadatas).screenResolutionData.screenWidth + (<ProjectMetadatas>this.currentProjectDetail.projectMetadatas).screenResolutionData.screenWidthUnit;
    }
    return projectResolutionDataWidth;
  }

  /**
   * Gets current project resolution data height
   * @returns the current project resolution data height 
   */
  getProjectResolutionDataHeight(): string {
    let projectResolutionDataHeight: string = '';
    if(this.currentProjectDetail?.projectMetadatas?.screenResolutionData){
      projectResolutionDataHeight = (<ProjectMetadatas>this.currentProjectDetail.projectMetadatas).screenResolutionData.screenHeight + (<ProjectMetadatas>this.currentProjectDetail.projectMetadatas).screenResolutionData.screenHeightUnit;
    }
    return projectResolutionDataHeight;
  }
}
