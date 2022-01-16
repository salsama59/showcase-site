import { Component, OnInit } from '@angular/core';
import { RouteConstants } from '../constants/route-constants';
import { NewsType } from '../enums/news-type';
import { SortOrder } from '../enums/sort-order';
import { News } from '../models/news.model';
import { Project } from '../models/project.model';
import { NewsService } from '../services/news.service';
import { ProjectsService } from '../services/projects.service';
import { ProjectUtilsService } from '../utils/project-utils.service';

/** 
 * Duration object declaration
*/
const Duration = require('duration');

/**
 * Home Component class responsible for the home page management.
 * @implements OnInit
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  /**
   * Recommended projects of home component
   */
  recommendedProjects: Array<Project> = [];

  /**
   * Current recommended project description of home component
   */
  currentRecommendedProjectDescription: string = '';

  /**
   * News list to display of home component
   */
  newsListToDisplay : Array<News> = [];

  /**
   * Route constants of home component
   */
   public routeConstants = RouteConstants;

   /**
   * News type of home component
   */
   public newsType = NewsType;

  /**
   * Creates an instance of home component.
   * @param projectsService the projects service
   * @param projectUtilsService the project utility service
   * @param newsService the news service
   * @public
   */
  constructor(private projectsService: ProjectsService, public projectUtilsService: ProjectUtilsService, private newsService: NewsService) { }

  /**
   * Initialize the recomended project list, the current recommended project description and the news list
   */
  ngOnInit(): void {
    this.recommendedProjects = this.getRecommendedProjects();
    this.currentRecommendedProjectDescription =this.recommendedProjects[0].projectDescription;
    this.newsListToDisplay = this.getFreshNews();
  }

  /**
   * Gets the news whose duration is less or equal 1 month
   * @returns fresh news list.
   * @private
   */
  private getFreshNews(): Array<News> {
    return this.newsService.getNews().filter((news: News, index: number) => {
      const duration: any = new Duration(news.newsCreationDate, new Date());
        return duration.months <= 1;
    });
  }

  /**
   * Gets the recommended projects wich are the 3 last modified project from the project list
   * @returns recommended projects
   * @private
   */
  private getRecommendedProjects(): Array<Project> {
    return this.projectsService.getProjects().sort((firstProject, secondProject) => {
      return  this.projectUtilsService.sortByProjectLastModifiedDate(firstProject, secondProject, SortOrder.DESCENDING);
    }).slice(0, 3);
  }


  /**
   * Determines what to do when the carousel slide event finished :
   * update the recommended project description using the slide index.
   * @param event the event catched
   */
  onCarouselSlideFinished(event: any): void {
    const currentSildeIndex: number = event.to;
    this.currentRecommendedProjectDescription = this.recommendedProjects[currentSildeIndex].projectDescription;
  }

  /**
   * Gets the elapsed time label representation by calculate the duration between the news creation date and the current date
   * @param startDate the new creation date
   * @returns the elapsed time label representation.
   */
  getElapsedTimeLabelRepresentation(startDate: Date): string {
    const duration: any = new Duration(startDate, new Date());
    let durationRepresentation: string = '';

    if(duration.month > 0){
      durationRepresentation += duration.month + ' month(s) ';
    }

    if(duration.day > 0){
      durationRepresentation += duration.day + ' day(s) ';
    }

    if(duration.hour > 0){
      durationRepresentation += duration.hour + ' hour(s) ';
    }

    if(duration.minute > 0){
      durationRepresentation += duration.minute + ' minute(s) ';
    }

    return durationRepresentation.trim();
  }

}