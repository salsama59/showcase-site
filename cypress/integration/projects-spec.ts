import { ProjectDomConstants } from "cypress/constants/project-dom-constants";
import { ProjectsDomConstants } from "cypress/constants/projects-dom-constants";
import { EndToEndTestUtils } from "cypress/utils/end-to-end-test-utils";
import { ProjectSortType } from '../../src/app/enums/project-sort-type';


describe('The Projects section end to end test', () => {
    it('should display the first project title', () => {
      EndToEndTestUtils.goToProjectListPage(cy);
      EndToEndTestUtils.getNthElement(cy, ProjectsDomConstants.PROJECT_ARTICLE_LIST, 0).should('contain', 'Project 5 title');
    });

    it('should display the first project description', () => {
      EndToEndTestUtils.goToProjectListPage(cy);
      EndToEndTestUtils.getNthElement(cy, ProjectsDomConstants.PROJECT_ARTICLE_LIST, 0).should('contain', 'This is the project 5 what else is there to say.');
    });

    it('should display the four paginated projects', () => {
      EndToEndTestUtils.goToProjectListPage(cy);
      cy.get(ProjectsDomConstants.PROJECT_ARTICLE_LIST).should('have.length', 4);
    });

    it('should display two projects after removing the web development filter', () => {
      EndToEndTestUtils.goToProjectListPage(cy);
      EndToEndTestUtils.clickElement(cy.get(ProjectsDomConstants.PROJECT_LIST_WEB_DEVELOPMENT_FILTER), true);
      cy.get(ProjectsDomConstants.PROJECT_ARTICLE_LIST).should('have.length', 2);
    });

    it('should display four projects after removing the game development filter', () => {
      EndToEndTestUtils.goToProjectListPage(cy);
      EndToEndTestUtils.clickElement(cy.get(ProjectsDomConstants.PROJECT_LIST_GAME_DEVELOPMENT_FILTER), true);
      cy.get(ProjectsDomConstants.PROJECT_ARTICLE_LIST).should('have.length', 4);
    });

    it('should display four paginated projects after removing the c# and unity technologies filters', () => {
      EndToEndTestUtils.goToProjectListPage(cy);
      EndToEndTestUtils.clickElement(cy.get(ProjectsDomConstants.PROJECT_LIST_CSHARP_FILTER), true);
      EndToEndTestUtils.clickElement(cy.get(ProjectsDomConstants.PROJECT_LIST_UNITY_FILTER), true);
      cy.get(ProjectsDomConstants.PROJECT_ARTICLE_LIST).should('have.length', 4);
    });

    it('should sort the projects by creation date descending order after the sort order button is clicked', () => {
      EndToEndTestUtils.goToProjectListPage(cy);
      EndToEndTestUtils.clickElement(cy.get(ProjectsDomConstants.PROJECT_LIST_SORT_ORDER_BUTTON), true);
      EndToEndTestUtils.getNthElement(cy, ProjectsDomConstants.PROJECT_ARTICLE_LIST, 0).should('contain', 'Project 2 title');
      EndToEndTestUtils.getNthElement(cy, ProjectsDomConstants.PROJECT_ARTICLE_LIST, 3).should('contain', 'Project 3 title');
    });

    it('should sort the projects by creation date ascending order after the sort order button is clicked twice in a row', () => {
      EndToEndTestUtils.goToProjectListPage(cy);
      EndToEndTestUtils.clickElement(cy.get(ProjectsDomConstants.PROJECT_LIST_SORT_ORDER_BUTTON), true);
      EndToEndTestUtils.clickElement(cy.get(ProjectsDomConstants.PROJECT_LIST_SORT_ORDER_BUTTON), true);
      EndToEndTestUtils.getNthElement(cy, ProjectsDomConstants.PROJECT_ARTICLE_LIST, 0).should('contain', 'Project 5 title');
      EndToEndTestUtils.getNthElement(cy, ProjectsDomConstants.PROJECT_ARTICLE_LIST, 3).should('contain', 'Project 1 title');
    });

    it('should sort the projects by project type ascending order after the sort dropdown value change for project type', () => {
      EndToEndTestUtils.goToProjectListPage(cy);
      EndToEndTestUtils.selectDropdownWithOptionValue(cy.get(ProjectsDomConstants.PROJECT_LIST_SORT_DROPDOWN), ProjectSortType.PROJECT_TYPE, true);
      EndToEndTestUtils.getNthElement(cy, ProjectsDomConstants.PROJECT_ARTICLE_LIST, 0).should('contain', 'Project 1 title');
      EndToEndTestUtils.getNthElement(cy, ProjectsDomConstants.PROJECT_ARTICLE_LIST, 3).should('contain', 'Project 2 title');
    });

    it('should sort the projects by project type descending order after the sort dropdown value change for project type and the sort order button is clicked', () => {
      EndToEndTestUtils.goToProjectListPage(cy);
      EndToEndTestUtils.selectDropdownWithOptionValue(cy.get(ProjectsDomConstants.PROJECT_LIST_SORT_DROPDOWN), ProjectSortType.PROJECT_TYPE, true);
      EndToEndTestUtils.clickElement(cy.get(ProjectsDomConstants.PROJECT_LIST_SORT_ORDER_BUTTON), true);
      EndToEndTestUtils.getNthElement(cy, ProjectsDomConstants.PROJECT_ARTICLE_LIST, 0).should('contain', 'Project 0 title');
      EndToEndTestUtils.getNthElement(cy, ProjectsDomConstants.PROJECT_ARTICLE_LIST, 3).should('contain', 'Project 4 title');
    });

    it('should sort the projects by project title ascending order after the sort dropdown value change for project title', () => {
      EndToEndTestUtils.goToProjectListPage(cy);
      EndToEndTestUtils.selectDropdownWithOptionValue(cy.get(ProjectsDomConstants.PROJECT_LIST_SORT_DROPDOWN), ProjectSortType.TITLE, true);
      EndToEndTestUtils.getNthElement(cy, ProjectsDomConstants.PROJECT_ARTICLE_LIST, 0).should('contain', 'Project 0 title');
      EndToEndTestUtils.getNthElement(cy, ProjectsDomConstants.PROJECT_ARTICLE_LIST, 3).should('contain', 'Project 3 title');
    });

    it('should sort the projects by project title descending order after the sort dropdown value change for project title and the sort order button is clicked', () => {
      EndToEndTestUtils.goToProjectListPage(cy);
      EndToEndTestUtils.selectDropdownWithOptionValue(cy.get(ProjectsDomConstants.PROJECT_LIST_SORT_DROPDOWN), ProjectSortType.TITLE, true);
      EndToEndTestUtils.clickElement(cy.get(ProjectsDomConstants.PROJECT_LIST_SORT_ORDER_BUTTON), true);
      EndToEndTestUtils.getNthElement(cy, ProjectsDomConstants.PROJECT_ARTICLE_LIST, 0).should('contain', 'Project 5 title');
      EndToEndTestUtils.getNthElement(cy, ProjectsDomConstants.PROJECT_ARTICLE_LIST, 3).should('contain', 'Project 2 title');
    });

    it('should sort the projects by project last modified date ascending order after the sort dropdown value change for last modified', () => {
      EndToEndTestUtils.goToProjectListPage(cy);
      EndToEndTestUtils.selectDropdownWithOptionValue(cy.get(ProjectsDomConstants.PROJECT_LIST_SORT_DROPDOWN), ProjectSortType.LAST_MODIFIED, true);
      EndToEndTestUtils.getNthElement(cy, ProjectsDomConstants.PROJECT_ARTICLE_LIST, 0).should('contain', 'Project 3 title');
      EndToEndTestUtils.getNthElement(cy, ProjectsDomConstants.PROJECT_ARTICLE_LIST, 3).should('contain', 'Project 5 title');
    });

    it('should sort the projects by project last modified date descending order after the sort dropdown value change for last modified  and the sort order button is clicked', () => {
      EndToEndTestUtils.goToProjectListPage(cy);
      EndToEndTestUtils.selectDropdownWithOptionValue(cy.get(ProjectsDomConstants.PROJECT_LIST_SORT_DROPDOWN), ProjectSortType.LAST_MODIFIED, true);
      EndToEndTestUtils.clickElement(cy.get(ProjectsDomConstants.PROJECT_LIST_SORT_ORDER_BUTTON), true);
      EndToEndTestUtils.getNthElement(cy, ProjectsDomConstants.PROJECT_ARTICLE_LIST, 0).should('contain', 'Project 0 title');
      EndToEndTestUtils.getNthElement(cy, ProjectsDomConstants.PROJECT_ARTICLE_LIST, 3).should('contain', 'Project 4 title');
    });

    it('should go to the first project details page', () => {
      EndToEndTestUtils.goToProjectListPage(cy);
      EndToEndTestUtils.getNthElement(cy, ProjectsDomConstants.PROJECT_ARTICLE_LIST, 0).find(ProjectsDomConstants.PROJECT_LIST_PROJECT_CARD_TITLE).invoke('text').then((h6Text) => {
        EndToEndTestUtils.clickElement(EndToEndTestUtils.getNthElement(cy, ProjectsDomConstants.PROJECT_ARTICLE_LIST, 0).find(ProjectsDomConstants.PROJECT_LIST_PROJECT_DETAILS_BUTTON), true);
        cy.get(ProjectDomConstants.PROJECT_DETAILS_PAGE_TITLE).should('contain', h6Text);
      });
    });

    it('should display the pagination', () => {
      EndToEndTestUtils.goToProjectListPage(cy);
      cy.get(ProjectsDomConstants.PROJECT_LIST_PAGINATION_BLOCK).should('be.visible');
    });
});

  