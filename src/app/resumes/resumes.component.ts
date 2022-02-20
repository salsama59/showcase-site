import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RouteConstants } from '../constants/route-constants';
import { RouteModeConstants } from '../constants/route-mode-constants';
import { Resume } from '../models/resume.model';
import { ResumesService } from '../services/resumes.service';

/**
 * Resumes component responsible for displaying the resume list
 */
@Component({
  selector: 'app-resumes',
  templateUrl: './resumes.component.html',
  styleUrls: ['./resumes.component.css']
})
export class ResumesComponent implements OnInit {

  /**
   * Resumes  of resumes component
   * @public
   */
  resumes!: Resume[];

  /**
   * Default resume id of resumes component
   * @public
   */
  defaultResumeId: number = -1;

  /**
   * Route constants of home component
   * @public
   */
   public routeModeConstants = RouteModeConstants;

  /**
   * Creates an instance of resumes component.
   * @param resumesService the resumes service
   * @param router the router
   * @param activatedRoute the activated route
   * @public
   * @constructor
   */
  constructor(private resumesService: ResumesService, private router: Router, private activatedRoute: ActivatedRoute) { }

  /**
   * Initialize the component by fetching the resume list an calculationg the default resume in order to displays it by default
   */
  ngOnInit(): void {
    this.resumes = this.resumesService.getResumes();
    const defaultResume: Resume = <Resume>this.resumes.find((resume: Resume, index: number) => resume.isDefault === true);
    this.defaultResumeId = defaultResume.resumeId;
    this.router.navigate([this.defaultResumeId, RouteModeConstants.MODE_VIEW_CONSTANT], {relativeTo: this.activatedRoute});
  }
}
