import { TestBed } from '@angular/core/testing';
import { ProjectTypeEnum } from '../enums/project-type-enum';
import { SortOrder } from '../enums/sort-order';
import { Project } from '../models/project.model';

import { ProjectUtilsService } from './project-utils.service';

describe('ProjectUtilsService', () => {
  let projectUtilsService: ProjectUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    projectUtilsService = TestBed.inject(ProjectUtilsService);
  });

  it('should be created', () => {
    expect(projectUtilsService).toBeTruthy();
  });

  // PROJECT CREATION DATE SORT

  it('should return 0 for the two projects creation date comparison given ascending sort order', () => {
		const project1: Project = new Project('0', 'title1', 'description1', ProjectTypeEnum.GAME_DEVELOPEMENT, [], new Date(2021,10, 20), new Date());
    const project2: Project = new Project('1', 'title2', 'description2', ProjectTypeEnum.GAME_DEVELOPEMENT, [], new Date(2021,10, 20), new Date());
    expect(projectUtilsService.sortByProjectCreationDate(project1, project2, SortOrder.ASCENDING)).toEqual(0);
	});

  it('should return 1 for the two projects creation date comparison given ascending sort order', () => {
		const project1: Project = new Project('0', 'title1', 'description1', ProjectTypeEnum.GAME_DEVELOPEMENT, [], new Date(2021,10, 20), new Date());
    const project2: Project = new Project('1', 'title2', 'description2', ProjectTypeEnum.GAME_DEVELOPEMENT, [], new Date(2020,10, 20), new Date());
    expect(projectUtilsService.sortByProjectCreationDate(project1, project2, SortOrder.ASCENDING)).toEqual(1);
	});

  it('should return -1 for the two projects creation date comparison given ascending sort order', () => {
		const project1: Project = new Project('0', 'title1', 'description1', ProjectTypeEnum.GAME_DEVELOPEMENT, [], new Date(2019,10, 20), new Date());
    const project2: Project = new Project('1', 'title2', 'description2', ProjectTypeEnum.GAME_DEVELOPEMENT, [], new Date(2020,10, 20), new Date());
    expect(projectUtilsService.sortByProjectCreationDate(project1, project2, SortOrder.ASCENDING)).toEqual(-1);
	});

  it('should return 0 for the two projects creation date comparison given descending sort order', () => {
		const project1: Project = new Project('0', 'title1', 'description1', ProjectTypeEnum.GAME_DEVELOPEMENT, [], new Date(2020,10, 20), new Date());
    const project2: Project = new Project('1', 'title2', 'description2', ProjectTypeEnum.GAME_DEVELOPEMENT, [], new Date(2020,10, 20), new Date());
    expect(projectUtilsService.sortByProjectCreationDate(project1, project2, SortOrder.DESCENDING)).toEqual(0);
	});

  it('should return 1 for the two projects creation date comparison given descending sort order', () => {
		const project1: Project = new Project('0', 'title1', 'description1', ProjectTypeEnum.GAME_DEVELOPEMENT, [], new Date(2019,10, 20), new Date());
    const project2: Project = new Project('1', 'title2', 'description2', ProjectTypeEnum.GAME_DEVELOPEMENT, [], new Date(2020,10, 20), new Date());
    expect(projectUtilsService.sortByProjectCreationDate(project1, project2, SortOrder.DESCENDING)).toEqual(1);
	});

  it('should return -1 for the two projects creation date comparison given descending sort order', () => {
		const project1: Project = new Project('0', 'title1', 'description1', ProjectTypeEnum.GAME_DEVELOPEMENT, [], new Date(2021,10, 20), new Date());
    const project2: Project = new Project('1', 'title2', 'description2', ProjectTypeEnum.GAME_DEVELOPEMENT, [], new Date(2020,10, 20), new Date());
    expect(projectUtilsService.sortByProjectCreationDate(project1, project2, SortOrder.DESCENDING)).toEqual(-1);
	});


  // PROJECT LAST MODIFIED DATE SORT

  it('should return 0 for the two projects title comparison given ascending sort order', () => {
		const project1: Project = new Project('0', 'titleB', 'description1', ProjectTypeEnum.GAME_DEVELOPEMENT, [], new Date(2021,10, 20), new Date(2021,10, 20));
    const project2: Project = new Project('1', 'titleA', 'description2', ProjectTypeEnum.GAME_DEVELOPEMENT, [], new Date(2020,10, 20), new Date(2021,10, 20));
    expect(projectUtilsService.sortByProjectLastModifiedDate(project1, project2, SortOrder.ASCENDING)).toEqual(0);
	});

  it('should return 1 for the two projects title comparison given ascending sort order', () => {
		const project1: Project = new Project('0', 'titleB', 'description1', ProjectTypeEnum.GAME_DEVELOPEMENT, [], new Date(2021,10, 20), new Date(2021,10, 20));
    const project2: Project = new Project('1', 'titleA', 'description2', ProjectTypeEnum.GAME_DEVELOPEMENT, [], new Date(2020,10, 20), new Date(2020,10, 20));
    expect(projectUtilsService.sortByProjectLastModifiedDate(project1, project2, SortOrder.ASCENDING)).toEqual(1);
	});

  it('should return -1 for the two projects title comparison given ascending sort order', () => {
		const project1: Project = new Project('0', 'titleA', 'description1', ProjectTypeEnum.GAME_DEVELOPEMENT, [], new Date(2019,10, 20), new Date(2020,10, 20));
    const project2: Project = new Project('1', 'titleB', 'description2', ProjectTypeEnum.GAME_DEVELOPEMENT, [], new Date(2020,10, 20), new Date(2021,10, 20));
    expect(projectUtilsService.sortByProjectLastModifiedDate(project1, project2, SortOrder.ASCENDING)).toEqual(-1);
	});

  it('should return 0 for the two projects title comparison given descending sort order', () => {
		const project1: Project = new Project('0', 'titleA', 'description1', ProjectTypeEnum.GAME_DEVELOPEMENT, [], new Date(2019,10, 20), new Date(2021,10, 20));
    const project2: Project = new Project('1', 'titleB', 'description2', ProjectTypeEnum.GAME_DEVELOPEMENT, [], new Date(2020,10, 20), new Date(2021,10, 20));
    expect(projectUtilsService.sortByProjectLastModifiedDate(project1, project2, SortOrder.DESCENDING)).toEqual(0);
	});

  it('should return 1 for the two projects title comparison given descending sort order', () => {
		const project1: Project = new Project('0', 'titleA', 'description1', ProjectTypeEnum.GAME_DEVELOPEMENT, [], new Date(2019,10, 20), new Date(2020,10, 20));
    const project2: Project = new Project('1', 'titleB', 'description2', ProjectTypeEnum.GAME_DEVELOPEMENT, [], new Date(2020,10, 20), new Date(2021,10, 20));
    expect(projectUtilsService.sortByProjectLastModifiedDate(project1, project2, SortOrder.DESCENDING)).toEqual(1);
	});

  it('should return -1 for the two projects title comparison given descending sort order', () => {
		const project1: Project = new Project('0', 'titleB', 'description1', ProjectTypeEnum.GAME_DEVELOPEMENT, [], new Date(2021,10, 20), new Date(2021,10, 20));
    const project2: Project = new Project('1', 'titleA', 'description2', ProjectTypeEnum.GAME_DEVELOPEMENT, [], new Date(2020,10, 20), new Date(2020,10, 20));
    expect(projectUtilsService.sortByProjectLastModifiedDate(project1, project2, SortOrder.DESCENDING)).toEqual(-1);
	});


  // PROJECT TITLE SORT

  it('should return 0 for the two projects title comparison given ascending sort order', () => {
		const project1: Project = new Project('0', 'title', 'description1', ProjectTypeEnum.GAME_DEVELOPEMENT, [], new Date(2021,10, 20), new Date());
    const project2: Project = new Project('1', 'title', 'description2', ProjectTypeEnum.GAME_DEVELOPEMENT, [], new Date(2020,10, 20), new Date());
    expect(projectUtilsService.sortByProjectTitle(project1, project2, SortOrder.ASCENDING)).toEqual(0);
	});

  it('should return 1 for the two projects title comparison given ascending sort order', () => {
		const project1: Project = new Project('0', 'titleB', 'description1', ProjectTypeEnum.GAME_DEVELOPEMENT, [], new Date(2021,10, 20), new Date());
    const project2: Project = new Project('1', 'titleA', 'description2', ProjectTypeEnum.GAME_DEVELOPEMENT, [], new Date(2020,10, 20), new Date());
    expect(projectUtilsService.sortByProjectTitle(project1, project2, SortOrder.ASCENDING)).toEqual(1);
	});

  it('should return -1 for the two projects title comparison given ascending sort order', () => {
		const project1: Project = new Project('0', 'titleA', 'description1', ProjectTypeEnum.GAME_DEVELOPEMENT, [], new Date(2019,10, 20), new Date());
    const project2: Project = new Project('1', 'titleB', 'description2', ProjectTypeEnum.GAME_DEVELOPEMENT, [], new Date(2020,10, 20), new Date());
    expect(projectUtilsService.sortByProjectTitle(project1, project2, SortOrder.ASCENDING)).toEqual(-1);
	});


  it('should return 0 for the two projects title comparison given descending sort order', () => {
		const project1: Project = new Project('0', 'title', 'description1', ProjectTypeEnum.GAME_DEVELOPEMENT, [], new Date(2019,10, 20), new Date());
    const project2: Project = new Project('1', 'title', 'description2', ProjectTypeEnum.GAME_DEVELOPEMENT, [], new Date(2020,10, 20), new Date());
    expect(projectUtilsService.sortByProjectTitle(project1, project2, SortOrder.DESCENDING)).toEqual(0);
	});

  it('should return 1 for the two projects title comparison given descending sort order', () => {
		const project1: Project = new Project('0', 'titleA', 'description1', ProjectTypeEnum.GAME_DEVELOPEMENT, [], new Date(2019,10, 20), new Date());
    const project2: Project = new Project('1', 'titleB', 'description2', ProjectTypeEnum.GAME_DEVELOPEMENT, [], new Date(2020,10, 20), new Date());
    expect(projectUtilsService.sortByProjectTitle(project1, project2, SortOrder.DESCENDING)).toEqual(1);
	});

  it('should return -1 for the two projects title comparison given descending sort order', () => {
		const project1: Project = new Project('0', 'titleB', 'description1', ProjectTypeEnum.GAME_DEVELOPEMENT, [], new Date(2021,10, 20), new Date());
    const project2: Project = new Project('1', 'titleA', 'description2', ProjectTypeEnum.GAME_DEVELOPEMENT, [], new Date(2020,10, 20), new Date());
    expect(projectUtilsService.sortByProjectTitle(project1, project2, SortOrder.DESCENDING)).toEqual(-1);
	});

  // PROJECT TYPE SORT

  it('should return 1 for the two projects title comparison given ascending sort order', () => {
		const project1: Project = new Project('0', 'titleB', 'description1', ProjectTypeEnum.WEB_DEVELOPEMENT, [], new Date(2021,10, 20), new Date());
    const project2: Project = new Project('1', 'titleA', 'description2', ProjectTypeEnum.WEB_DEVELOPEMENT, [], new Date(2020,10, 20), new Date());
    expect(projectUtilsService.sortByProjectType(project1, project2, SortOrder.ASCENDING)).toEqual(0);
	});

  it('should return 1 for the two projects title comparison given ascending sort order', () => {
		const project1: Project = new Project('0', 'titleB', 'description1', ProjectTypeEnum.WEB_DEVELOPEMENT, [], new Date(2021,10, 20), new Date());
    const project2: Project = new Project('1', 'titleA', 'description2', ProjectTypeEnum.GAME_DEVELOPEMENT, [], new Date(2020,10, 20), new Date());
    expect(projectUtilsService.sortByProjectType(project1, project2, SortOrder.ASCENDING)).toEqual(1);
	});

  it('should return -1 for the two projects title comparison given ascending sort order', () => {
		const project1: Project = new Project('0', 'titleA', 'description1', ProjectTypeEnum.GAME_DEVELOPEMENT, [], new Date(2019,10, 20), new Date());
    const project2: Project = new Project('1', 'titleB', 'description2', ProjectTypeEnum.WEB_DEVELOPEMENT, [], new Date(2020,10, 20), new Date());
    expect(projectUtilsService.sortByProjectType(project1, project2, SortOrder.ASCENDING)).toEqual(-1);
	});

  it('should return 0 for the two projects title comparison given descending sort order', () => {
		const project1: Project = new Project('0', 'titleA', 'description1', ProjectTypeEnum.WEB_DEVELOPEMENT, [], new Date(2019,10, 20), new Date());
    const project2: Project = new Project('1', 'titleB', 'description2', ProjectTypeEnum.WEB_DEVELOPEMENT, [], new Date(2020,10, 20), new Date());
    expect(projectUtilsService.sortByProjectType(project1, project2, SortOrder.DESCENDING)).toEqual(0);
	});

  it('should return 1 for the two projects title comparison given descending sort order', () => {
		const project1: Project = new Project('0', 'titleA', 'description1', ProjectTypeEnum.GAME_DEVELOPEMENT, [], new Date(2019,10, 20), new Date());
    const project2: Project = new Project('1', 'titleB', 'description2', ProjectTypeEnum.WEB_DEVELOPEMENT, [], new Date(2020,10, 20), new Date());
    expect(projectUtilsService.sortByProjectType(project1, project2, SortOrder.DESCENDING)).toEqual(1);
	});

  it('should return -1 for the two projects title comparison given descending sort order', () => {
		const project1: Project = new Project('0', 'titleB', 'description1', ProjectTypeEnum.WEB_DEVELOPEMENT, [], new Date(2021,10, 20), new Date());
    const project2: Project = new Project('1', 'titleA', 'description2', ProjectTypeEnum.GAME_DEVELOPEMENT, [], new Date(2020,10, 20), new Date());
    expect(projectUtilsService.sortByProjectType(project1, project2, SortOrder.DESCENDING)).toEqual(-1);
	});
});
