import { HttpInterceptorAliasConstants } from "cypress/constants/http-interceptor-alias-constants";
import { ProjectDomConstants } from "cypress/constants/project-dom-constants";
import { NewsMocks } from "cypress/mocks/news-mocks";
import { ProjectDetailsMocks } from "cypress/mocks/project-details-mocks";
import { ProjectsMocks } from "cypress/mocks/projects-mocks";
import { SocialNetworksMocks } from "cypress/mocks/social-networks-mocks";
import { EndToEndTestUtils } from "cypress/utils/end-to-end-test-utils";
import { BackendEndpointConstants } from "src/app/constants/backend-endpoint-constants";
import { News } from "src/app/models/news.model";
import { ProjectDetail } from "src/app/models/project-detail.model";
import { Project } from "src/app/models/project.model";
import { SocialNetwork } from "src/app/models/social-network.model";
import { environment } from "src/environments/environment";


describe('The Project section end to end test', () => {

    beforeEach(() => {
        cy.fixture<News[]>('news.json').then(newsList => {
          NewsMocks.getNews(environment.showcaseBackendUrl + BackendEndpointConstants.NEWS_ENDPOINT_URI, newsList);
        });
        cy.fixture<SocialNetwork[]>('social-networks.json').then(socialNetworks => {
          SocialNetworksMocks.getSocialNetworks(environment.showcaseBackendUrl + BackendEndpointConstants.SOCIAL_NETWORK_ENDPOINT_URI, socialNetworks);
        });
        cy.fixture<Project[]>('projects.json').then(projects => {
            ProjectsMocks.getProjects(environment.showcaseBackendUrl + BackendEndpointConstants.PROJECTS_ENDPOINT_URI, projects);
        });

        cy.fixture<Project[]>('projects.json').then(projects => {
            ProjectsMocks.getProjectById(environment.showcaseBackendUrl + BackendEndpointConstants.PROJECTS_ENDPOINT_URI, projects, '624736e7b97ff99dc964e4ca');
        });

        cy.fixture<Project[]>('projects.json').then(projects => {
            ProjectsMocks.getProjectById(environment.showcaseBackendUrl + BackendEndpointConstants.PROJECTS_ENDPOINT_URI, projects, '624736e7b97ff99dc964e4cb');
        });

        cy.fixture<ProjectDetail[]>('project-details.json').then(projectDetails => {
            ProjectDetailsMocks.getProjectDetailsByProjectId(environment.showcaseBackendUrl + BackendEndpointConstants.PROJECT_DETAILS_ENDPOINT_URI, projectDetails, '624736e7b97ff99dc964e4ca');
        });

        cy.fixture<ProjectDetail[]>('project-details.json').then(projectDetails => {
            ProjectDetailsMocks.getProjectDetailsByProjectId(environment.showcaseBackendUrl + BackendEndpointConstants.PROJECT_DETAILS_ENDPOINT_URI, projectDetails, '624736e7b97ff99dc964e4cb');
        });

        cy.visit('/');
        cy.wait('@' + HttpInterceptorAliasConstants.GET_NEWS_ALIAS);
        cy.wait('@' + HttpInterceptorAliasConstants.GET_SOCIAL_NETWORKS_ALIAS);
        cy.wait('@' + HttpInterceptorAliasConstants.GET_PROJECTS_ALIAS);
      });

    it('should display the first project detail title', () => {
        EndToEndTestUtils.goToProjectDetailPage(cy, '624736e7b97ff99dc964e4ca');
        cy.wait('@' + HttpInterceptorAliasConstants.GET_PROJECT_BY_ID_ALIAS);
        cy.wait('@' + HttpInterceptorAliasConstants.GET_PROJECT_DETAILS_BY_PROJECT_ID);
        cy.get(ProjectDomConstants.PROJECT_DETAILS_PAGE_TITLE).should('contain', 'Project 0 title');
    });

    it('should display the first project detail introduction title', () => {
        EndToEndTestUtils.goToProjectDetailPage(cy, '624736e7b97ff99dc964e4ca');
        cy.wait('@' + HttpInterceptorAliasConstants.GET_PROJECT_BY_ID_ALIAS);
        cy.wait('@' + HttpInterceptorAliasConstants.GET_PROJECT_DETAILS_BY_PROJECT_ID);
        cy.get(ProjectDomConstants.PROJECT_DETAILS_INTRODUCTION_TITLE).should('contain', 'Introduction :');
    });

    it('should display the first project detail instructions title', () => {
        EndToEndTestUtils.goToProjectDetailPage(cy, '624736e7b97ff99dc964e4ca');
        cy.wait('@' + HttpInterceptorAliasConstants.GET_PROJECT_BY_ID_ALIAS);
        cy.wait('@' + HttpInterceptorAliasConstants.GET_PROJECT_DETAILS_BY_PROJECT_ID);
        cy.get(ProjectDomConstants.PROJECT_DETAILS_INSTRUCTIONS_TITLE).should('contain', 'Instructions :');
    });

    it('should display the first project detail test title', () => {
        EndToEndTestUtils.goToProjectDetailPage(cy, '624736e7b97ff99dc964e4ca');
        cy.wait('@' + HttpInterceptorAliasConstants.GET_PROJECT_BY_ID_ALIAS);
        cy.wait('@' + HttpInterceptorAliasConstants.GET_PROJECT_DETAILS_BY_PROJECT_ID);
        cy.get(ProjectDomConstants.PROJECT_DETAILS_TEST_TITLE).should('contain', 'Test the project :');
    });

    it('should posses a valid web project url', () => {
        EndToEndTestUtils.goToProjectDetailPage(cy, '624736e7b97ff99dc964e4ca');
        cy.wait('@' + HttpInterceptorAliasConstants.GET_PROJECT_BY_ID_ALIAS);
        cy.wait('@' + HttpInterceptorAliasConstants.GET_PROJECT_DETAILS_BY_PROJECT_ID);
        cy.get(ProjectDomConstants.WEB_PROJECT_DETAILS_TEST_CONTENT).should('contain', 'Go to the project page').should('have.attr', 'href');
    });

    it('should posses a valid game project url', () => {
        EndToEndTestUtils.goToProjectDetailPage(cy, '624736e7b97ff99dc964e4cb');
        cy.wait('@' + HttpInterceptorAliasConstants.GET_PROJECT_BY_ID_ALIAS);
        cy.wait('@' + HttpInterceptorAliasConstants.GET_PROJECT_DETAILS_BY_PROJECT_ID);
        cy.get(ProjectDomConstants.GAME_PROJECT_DETAILS_TEST_CONTENT).find('iframe').should('have.attr', 'src');
    });
});

  