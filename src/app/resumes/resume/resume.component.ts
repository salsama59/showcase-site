import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { LanguageLevelType } from '../../enums/language-level-type';
import { SkillLevelType } from '../../enums/skill-level-type';
import { Resume } from '../../models/resume.model';
import { ResumesService } from '../../services/resumes.service';
import { EnumUtilsService } from '../../utils/enum-utils.service';

/**
 * Resume component responsible for displaying the current chosen resume.
 */
@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent implements OnInit {

  /**
   * Current resume of resume component
   * @public
   */
  currentResume?: Resume;

  /**
   * Skill level type of resume component
   * @public
   */
  public skillLevelType = SkillLevelType;

  /**
   * Language level type of resume component
   * @public
   */
  public languageLevelType = LanguageLevelType;

  /**
   * Creates an instance of resume component.
   * @param resumesService the resumes service
   * @param enumUtilsService the enum utility service
   * @param activatedRoute  the activated route
   */
  constructor(private resumesService: ResumesService, public enumUtilsService: EnumUtilsService, private activatedRoute: ActivatedRoute) { }

  /**
   * Initialize the component by subscribing to the route params and fetching the resume to diplay given the resume id
   */
  ngOnInit(): void {
    this.activatedRoute.params.subscribe({next: (params: Params) => {
      const currentResumeId: string = params['resumeId'];
     this.resumesService.getResumeById(currentResumeId).subscribe(resume => {
      this.currentResume = resume;
      });
    }});
  }

  /**
   * Determines whether the level opacity is enabled
   * @param targetLevelNumber the target level number
   * @param currentLevel the current level processed
   * @returns true if the current level processed value is greater than the target level number, false otherwise
   */
  isLevelOpacityEnabled(targetLevelNumber: number, currentLevel: number): boolean {
    return currentLevel > targetLevelNumber;
  }

}
