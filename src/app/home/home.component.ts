import { Component, OnInit } from '@angular/core';
import { RouteConstants } from '../constants/route-constants';
import { NewsType } from '../enums/news-type';
import { SortOrder } from '../enums/sort-order';
import { News } from '../models/news.model';
import { Project } from '../models/project.model';
import { NewsService } from '../services/news.service';
import { ProjectsService } from '../services/projects.service';
import { ProjectUtilsService } from '../utils/project-utils.service';
import moment  from 'moment';
import { Router } from '@angular/router';
import { RouteModeConstants } from '../constants/route-mode-constants';
import { map } from "rxjs/operators";
import { Observable, of } from 'rxjs';
import { TranslationsService } from '../services/translations.service';
import { HomeTranslationsConstants } from '../constants/home-translations-constants';
import { LocaleService } from '../services/locale.service';

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
   * Recommended projects observable of home component
   */
  recommendedProjects: Observable<Project[]> = of([]);

  /**
   * Recommended projects to display of home component
   */
   recommendedProjectsTodisplay: Project[] = [];

  /**
   * Current recommended project description of home component
   */
  currentRecommendedProjectDescription: string = '';

  /**
   * News list to display of home component
   */
  newsListToDisplay :  Observable<News[]> = new Observable<News[]>()

  /**
   * Route constants of home component
   */
   public routeConstants = RouteConstants;

   /**
   * News type of home component
   */
   public newsType = NewsType;


   /**
    * Home translations constants of home component
    */
   public homeTranslationsConstants = HomeTranslationsConstants;

  /**
   * Creates an instance of home component.
   * @param projectsService the projects service
   * @param projectUtilsService the project utility service
   * @param newsService the news service
   * @param router the router
   * @param translationsService the translations service
   * @param localeService the locale service
   * @public
   */
  constructor(private projectsService: ProjectsService, public projectUtilsService: ProjectUtilsService, private newsService: NewsService, private router: Router, public translationsService: TranslationsService, private localeService: LocaleService) { }

  /**
   * Initialize the recomended project list, the current recommended project description and the news list
   */
  ngOnInit(): void {
    this.recommendedProjects = this.getRecommendedProjects();
    this.recommendedProjects.subscribe(projects => {
      this.recommendedProjectsTodisplay = projects;
      this.currentRecommendedProjectDescription = this.translationsService.get(this.recommendedProjectsTodisplay[0].projectDescriptionTranslationKey);
    });
    
    this.newsListToDisplay = this.getFreshNews();
  }

  /**
   * Gets the news whose duration is less or equal 1 month
   * @returns fresh news list.
   * @private
   */
  private getFreshNews(): Observable<News[]> {
    return this.newsService
    .getNews()
    .pipe(
      map(news => {
      return news.filter((news: News, index: number) => {
        const millisecondDuration: number = new Date().getTime() - news.newsCreationDate.getTime(); 
        const duration: moment.Duration = moment.duration(millisecondDuration, "milliseconds");
          return duration.years() === 0 && duration.months() <= 1;
      });
    }));
  }

  /**
   * Gets the recommended projects wich are the 3 last modified project from the project list
   * @returns recommended projects
   * @private
   */
  private getRecommendedProjects(): Observable<Array<Project>> {
    return this.projectsService.getProjects().pipe(
      map(projects => {
        projects.sort((firstProject, secondProject) => {
          return  this.projectUtilsService.sortByProjectLastModifiedDate(firstProject, secondProject, SortOrder.DESCENDING);
        });
        return projects.slice(0, 3);
      })
    );
  }


  /**
   * Determines what to do when the carousel slide event finished :
   * update the recommended project description using the slide index.
   * @param event the event catched
   */
  onCarouselSlideFinished(event: any): void {
    const currentSildeIndex: number = event.to;
    this.currentRecommendedProjectDescription = this.translationsService.get(this.recommendedProjectsTodisplay[currentSildeIndex].projectDescriptionTranslationKey);
  }

  /**
   * Determines what to do when the user click on the recommended projects carousel image
   * @param projectId  the project id
   */
  onProjectDetailNavigation(projectId: string): void {
    void this.router.navigate([RouteConstants.PROJECTS_ROUTE_PATH, projectId, RouteModeConstants.MODE_VIEW_CONSTANT]);
  }

  /**
   * Gets the elapsed time label representation by calculate the duration between the news creation date and the current date
   * @param startDate the new creation date
   * @returns the elapsed time label representation.
   */
  getElapsedTimeLabelRepresentation(startDate: Date): string {
    
    let durationRepresentation: string = '';
    const millisecondDuration: number = new Date().getTime() - startDate.getTime(); 
    const duration: moment.Duration = moment.duration(millisecondDuration, "milliseconds").locale(this.localeService.getCurrentLocale());

    if(duration.months() > 0){
      durationRepresentation += duration.months() + this.translationsService.get(this.homeTranslationsConstants.HOME_PAGE_NEWS_SECTION_DURATION_DETAILS_MONTHS_TEXT_KEY);
    }

    if(duration.days() > 0){
      durationRepresentation += duration.days() + this.translationsService.get(this.homeTranslationsConstants.HOME_PAGE_NEWS_SECTION_DURATION_DETAILS_DAYS_TEXT_KEY);
    }

    if(duration.hours() > 0){
      durationRepresentation += duration.hours() + this.translationsService.get(this.homeTranslationsConstants.HOME_PAGE_NEWS_SECTION_DURATION_DETAILS_HOURS_TEXT_KEY);
    }

    if(duration.minutes() > 0){
      durationRepresentation += duration.minutes() + this.translationsService.get(this.homeTranslationsConstants.HOME_PAGE_NEWS_SECTION_DURATION_DETAILS_MINUTES_TEXT_KEY);
    }

    return durationRepresentation.trim();
  }

}
