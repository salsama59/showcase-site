import { HttpInterceptorAliasConstants } from "cypress/constants/http-interceptor-alias-constants";
import { ProjectDomConstants } from "cypress/constants/project-dom-constants";
import { ProjectsDomConstants } from "cypress/constants/projects-dom-constants";
import { ProjectDetailsMocks } from "cypress/mocks/project-details-mocks";
import { ProjectsMocks } from "cypress/mocks/projects-mocks";
import { SocialNetworksMocks } from "cypress/mocks/social-networks-mocks";
import { EndToEndTestUtils } from "cypress/utils/end-to-end-test-utils";
import { BackendEndpointConstants } from "src/app/constants/backend-endpoint-constants";
import { ProjectDetail } from "src/app/models/project-detail.model";
import { Project } from "src/app/models/project.model";
import { SocialNetwork } from "src/app/models/social-network.model";
import { environment } from "src/environments/environment";
import { ProjectSortType } from '../../src/app/enums/project-sort-type';


describe('The Projects section end to end test', () => {

    beforeEach(() => {
     
      cy.fixture<SocialNetwork[]>('social-networks.json').then(socialNetworks => {
        SocialNetworksMocks.getSocialNetworks(environment.showcaseBackendUrl + BackendEndpointConstants.SOCIAL_NETWORK_ENDPOINT_URI, socialNetworks);
      });
      cy.fixture<Project[]>('projects.json').then(projects => {
          ProjectsMocks.getProjects(environment.showcaseBackendUrl + BackendEndpointConstants.PROJECTS_ENDPOINT_URI, projects);
      });
      cy.fixture<Project[]>('projects.json').then(projects => {
        ProjectsMocks.getProjectById(environment.showcaseBackendUrl + BackendEndpointConstants.PROJECTS_ENDPOINT_URI, projects, '624736e7b97ff99dc964e4cf');
      });

        cy.fixture<ProjectDetail[]>('project-details.json').then(projectDetails => {
            ProjectDetailsMocks.getProjectDetailsByProjectId(environment.showcaseBackendUrl + BackendEndpointConstants.PROJECT_DETAILS_ENDPOINT_URI, projectDetails, '624736e7b97ff99dc964e4cf');
        });
      EndToEndTestUtils.goToProjectListPage(cy);
      cy.wait('@' + HttpInterceptorAliasConstants.GET_SOCIAL_NETWORKS_ALIAS);
      cy.wait('@' + HttpInterceptorAliasConstants.GET_PROJECTS_ALIAS);
    });

    it('should display the first project title', () => {
      EndToEndTestUtils.getNthElement(cy, ProjectsDomConstants.PROJECT_ARTICLE_LIST, 0).should('contain', 'Project 5 title');
    });

    it('should display the first project description', () => {
      EndToEndTestUtils.getNthElement(cy, ProjectsDomConstants.PROJECT_ARTICLE_LIST, 0).should('contain', 'This is the project 5 what else is there to say.');
    });

    it('should display the four paginated projects', () => {
      cy.get(ProjectsDomConstants.PROJECT_ARTICLE_LIST).should('have.length', 4);
    });

    it('should display two projects after removing the web development filter', () => {
      EndToEndTestUtils.clickElement(cy.get(ProjectsDomConstants.PROJECT_LIST_WEB_DEVELOPMENT_FILTER), true);
      cy.get(ProjectsDomConstants.PROJECT_ARTICLE_LIST).should('have.length', 2);
    });

    it('should display four projects after removing the game development filter', () => {
      EndToEndTestUtils.clickElement(cy.get(ProjectsDomConstants.PROJECT_LIST_GAME_DEVELOPMENT_FILTER), true);
      cy.get(ProjectsDomConstants.PROJECT_ARTICLE_LIST).should('have.length', 4);
    });

    it('should display four paginated projects after removing the c# and unity technologies filters', () => {
      EndToEndTestUtils.clickElement(cy.get(ProjectsDomConstants.PROJECT_LIST_CSHARP_FILTER), true);
      EndToEndTestUtils.clickElement(cy.get(ProjectsDomConstants.PROJECT_LIST_UNITY_FILTER), true);
      cy.get(ProjectsDomConstants.PROJECT_ARTICLE_LIST).should('have.length', 4);
    });

    it('should sort the projects by creation date descending order after the sort order button is clicked', () => {
      EndToEndTestUtils.clickElement(cy.get(ProjectsDomConstants.PROJECT_LIST_SORT_ORDER_BUTTON), true);
      EndToEndTestUtils.getNthElement(cy, ProjectsDomConstants.PROJECT_ARTICLE_LIST, 0).should('contain', 'Project 2 title');
      EndToEndTestUtils.getNthElement(cy, ProjectsDomConstants.PROJECT_ARTICLE_LIST, 3).should('contain', 'Project 3 title');
    });

    it('should sort the projects by creation date ascending order after the sort order button is clicked twice in a row', () => {
      EndToEndTestUtils.clickElement(cy.get(ProjectsDomConstants.PROJECT_LIST_SORT_ORDER_BUTTON), true);
      EndToEndTestUtils.clickElement(cy.get(ProjectsDomConstants.PROJECT_LIST_SORT_ORDER_BUTTON), true);
      EndToEndTestUtils.getNthElement(cy, ProjectsDomConstants.PROJECT_ARTICLE_LIST, 0).should('contain', 'Project 5 title');
      EndToEndTestUtils.getNthElement(cy, ProjectsDomConstants.PROJECT_ARTICLE_LIST, 3).should('contain', 'Project 1 title');
    });

    it('should sort the projects by project type ascending order after the sort dropdown value change for project type', () => {
      EndToEndTestUtils.selectDropdownWithOptionValue(cy.get(ProjectsDomConstants.PROJECT_LIST_SORT_DROPDOWN), ProjectSortType.PROJECT_TYPE, true);
      EndToEndTestUtils.getNthElement(cy, ProjectsDomConstants.PROJECT_ARTICLE_LIST, 0).should('contain', 'Project 1 title');
      EndToEndTestUtils.getNthElement(cy, ProjectsDomConstants.PROJECT_ARTICLE_LIST, 3).should('contain', 'Project 2 title');
    });

    it('should sort the projects by project type descending order after the sort dropdown value change for project type and the sort order button is clicked', () => {
      EndToEndTestUtils.selectDropdownWithOptionValue(cy.get(ProjectsDomConstants.PROJECT_LIST_SORT_DROPDOWN), ProjectSortType.PROJECT_TYPE, true);
      EndToEndTestUtils.clickElement(cy.get(ProjectsDomConstants.PROJECT_LIST_SORT_ORDER_BUTTON), true);
      EndToEndTestUtils.getNthElement(cy, ProjectsDomConstants.PROJECT_ARTICLE_LIST, 0).should('contain', 'Project 0 title');
      EndToEndTestUtils.getNthElement(cy, ProjectsDomConstants.PROJECT_ARTICLE_LIST, 3).should('contain', 'Project 4 title');
    });

    it('should sort the projects by project title ascending order after the sort dropdown value change for project title', () => {
      EndToEndTestUtils.selectDropdownWithOptionValue(cy.get(ProjectsDomConstants.PROJECT_LIST_SORT_DROPDOWN), ProjectSortType.TITLE, true);
      EndToEndTestUtils.getNthElement(cy, ProjectsDomConstants.PROJECT_ARTICLE_LIST, 0).should('contain', 'Project 0 title');
      EndToEndTestUtils.getNthElement(cy, ProjectsDomConstants.PROJECT_ARTICLE_LIST, 3).should('contain', 'Project 3 title');
    });

    it('should sort the projects by project title descending order after the sort dropdown value change for project title and the sort order button is clicked', () => {
      EndToEndTestUtils.selectDropdownWithOptionValue(cy.get(ProjectsDomConstants.PROJECT_LIST_SORT_DROPDOWN), ProjectSortType.TITLE, true);
      EndToEndTestUtils.clickElement(cy.get(ProjectsDomConstants.PROJECT_LIST_SORT_ORDER_BUTTON), true);
      EndToEndTestUtils.getNthElement(cy, ProjectsDomConstants.PROJECT_ARTICLE_LIST, 0).should('contain', 'Project 5 title');
      EndToEndTestUtils.getNthElement(cy, ProjectsDomConstants.PROJECT_ARTICLE_LIST, 3).should('contain', 'Project 2 title');
    });

    it('should sort the projects by project last modified date ascending order after the sort dropdown value change for last modified', () => {
      EndToEndTestUtils.selectDropdownWithOptionValue(cy.get(ProjectsDomConstants.PROJECT_LIST_SORT_DROPDOWN), ProjectSortType.LAST_MODIFIED, true);
      EndToEndTestUtils.getNthElement(cy, ProjectsDomConstants.PROJECT_ARTICLE_LIST, 0).should('contain', 'Project 3 title');
      EndToEndTestUtils.getNthElement(cy, ProjectsDomConstants.PROJECT_ARTICLE_LIST, 3).should('contain', 'Project 5 title');
    });

    it('should sort the projects by project last modified date descending order after the sort dropdown value change for last modified  and the sort order button is clicked', () => {
      EndToEndTestUtils.selectDropdownWithOptionValue(cy.get(ProjectsDomConstants.PROJECT_LIST_SORT_DROPDOWN), ProjectSortType.LAST_MODIFIED, true);
      EndToEndTestUtils.clickElement(cy.get(ProjectsDomConstants.PROJECT_LIST_SORT_ORDER_BUTTON), true);
      EndToEndTestUtils.getNthElement(cy, ProjectsDomConstants.PROJECT_ARTICLE_LIST, 0).should('contain', 'Project 0 title');
      EndToEndTestUtils.getNthElement(cy, ProjectsDomConstants.PROJECT_ARTICLE_LIST, 3).should('contain', 'Project 4 title');
    });

    it('should go to the first project details page', () => {
      EndToEndTestUtils.getNthElement(cy, ProjectsDomConstants.PROJECT_ARTICLE_LIST, 0).find(ProjectsDomConstants.PROJECT_LIST_PROJECT_CARD_TITLE).invoke('text').then((h6Text) => {
        EndToEndTestUtils.clickElement(EndToEndTestUtils.getNthElement(cy, ProjectsDomConstants.PROJECT_ARTICLE_LIST, 0).find(ProjectsDomConstants.PROJECT_LIST_PROJECT_DETAILS_BUTTON), true);
        cy.wait('@' + HttpInterceptorAliasConstants.GET_PROJECT_BY_ID_ALIAS);
        cy.wait('@' + HttpInterceptorAliasConstants.GET_PROJECT_DETAILS_BY_PROJECT_ID);
        cy.get(ProjectDomConstants.PROJECT_DETAILS_PAGE_TITLE).should('contain', h6Text);
      });
    });

    it('should display the pagination', () => {
      cy.get(ProjectsDomConstants.PROJECT_LIST_PAGINATION_BLOCK).should('be.visible');
    });
});

  