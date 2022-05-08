import { HomeDomConstants } from "cypress/constants/home-dom-constants";
import { ProjectDomConstants } from "cypress/constants/project-dom-constants";
import { ProjectsDomConstants } from "cypress/constants/projects-dom-constants";
import { ResumesDomConstants } from "cypress/constants/resumes-dom-constants";
import { NewsMocks } from "cypress/mocks/news-mocks";
import { EndToEndTestUtils } from "cypress/utils/end-to-end-test-utils"
import { News } from "src/app/models/news.model";
import { environment } from 'src/environments/environment';
import { BackendEndpointConstants } from 'src/app/constants/backend-endpoint-constants';
import { SocialNetworksMocks } from "cypress/mocks/social-networks-mocks";
import { SocialNetwork } from "src/app/models/social-network.model";
import { HttpInterceptorAliasConstants } from "cypress/constants/http-interceptor-alias-constants";
import { ProjectsMocks } from "cypress/mocks/projects-mocks";
import { Project } from "src/app/models/project.model";
import { ProjectDetailsMocks } from "cypress/mocks/project-details-mocks";
import { ProjectDetail } from "src/app/models/project-detail.model";
import { Translation } from "src/app/models/translation.model";
import { TranslationsMocks } from "cypress/mocks/translations-mocks";

describe('The Home page end to end test', () => {

  beforeEach(() => {
    cy.fixture<News[]>('news.json',).then(newsList => {
      NewsMocks.getNews(environment.showcaseBackendUrl + BackendEndpointConstants.NEWS_ENDPOINT_URI, newsList);
    });
    cy.fixture<SocialNetwork[]>('social-networks.json',).then(socialNetworks => {
      SocialNetworksMocks.getSocialNetworks(environment.showcaseBackendUrl + BackendEndpointConstants.SOCIAL_NETWORK_ENDPOINT_URI, socialNetworks);
    });
    cy.fixture<Project[]>('projects.json').then(projects => {
      ProjectsMocks.getProjects(environment.showcaseBackendUrl + BackendEndpointConstants.PROJECTS_ENDPOINT_URI, projects);
    });
    cy.fixture<Project[]>('projects.json').then(projects => {
      ProjectsMocks.getProjectById(environment.showcaseBackendUrl + BackendEndpointConstants.PROJECTS_ENDPOINT_URI, projects, '624736e7b97ff99dc964e4ca');
    });
    cy.fixture<ProjectDetail[]>('project-details.json').then(projectDetails => {
        ProjectDetailsMocks.getProjectDetailsByProjectId(environment.showcaseBackendUrl + BackendEndpointConstants.PROJECT_DETAILS_ENDPOINT_URI, projectDetails, '624736e7b97ff99dc964e4ca');
    });

    cy.fixture<Translation[]>('translations.json').then(translations => {
      TranslationsMocks.getTranslationsByCurrentLocale(environment.showcaseBackendUrl + BackendEndpointConstants.TRANSLATIONS_ENDPOINT_URI, translations);
    });
    
    cy.visit('/');
    cy.wait('@' + HttpInterceptorAliasConstants.GET_NEWS_ALIAS);
    cy.wait('@' + HttpInterceptorAliasConstants.GET_SOCIAL_NETWORKS_ALIAS);
    cy.wait('@' + HttpInterceptorAliasConstants.GET_PROJECTS_ALIAS);
    cy.wait('@' + HttpInterceptorAliasConstants.GET_TRANSLATIONS_BY_CURRENT_LOCALE);
  });

  it('Visits the home page', () => {
    cy.get(HomeDomConstants.HOME_PAGE_TITLE_GENERAL_TITLE_SELECTOR).should('contain', 'Welcome to my showcase site');
    cy.get(HomeDomConstants.HOME_PAGE_TITLE_INTRODUCTION_TITLE_SELECTOR).should('contain', 'Introduction :');
    cy.get(HomeDomConstants.HOME_PAGE_TITLE_NEWS_TITLE_SELECTOR).should('contain', `What's new ?`);
    cy.get(HomeDomConstants.HOME_PAGE_TITLE_RECOMMENDED_PROJECTS_TITLE_SELECTOR).should('contain', 'Recommended projects :');

    cy.get(HomeDomConstants.HOME_SECTIONS_HOME_LINK_SELECTOR).should('contain', 'The home page');
    cy.get(HomeDomConstants.HOME_SECTIONS_PROJECTS_LINK_SELECTOR).should('contain', 'The projects page');
    cy.get(HomeDomConstants.HOME_SECTIONS_CV_LINK_SELECTOR).should('contain', 'The resumes page');

  });

  it('Should stay on the home page when clicking in the home page link at the section list', () => {
    EndToEndTestUtils.clickElement(cy.get(HomeDomConstants.HOME_SECTIONS_HOME_LINK_SELECTOR), true);
    cy.get(HomeDomConstants.HOME_PAGE_TITLE_GENERAL_TITLE_SELECTOR).should('contain', 'Welcome to my showcase site');
  });

  it('Should navigate to the project page when clicking in the projects page link at the section list', () => {
    EndToEndTestUtils.clickElement(cy.get(HomeDomConstants.HOME_SECTIONS_PROJECTS_LINK_SELECTOR), true);
    cy.get(ProjectsDomConstants.PROJECT_LIST_PAGE_TITLE).should('contain', 'Project list page');
  });

  it('Should navigate to The resumes page when clicking in The resumes page link at the section list', () => {
    EndToEndTestUtils.clickElement(cy.get(HomeDomConstants.HOME_SECTIONS_CV_LINK_SELECTOR), true);
    cy.get(ResumesDomConstants.RESUMES_LIST_PAGE_TITLE).should('contain', 'This is my resumes');
  });

  it('Should navigate to the project detail page when clicking on the recommended projects caroussel', () => {
    cy.get(HomeDomConstants.HOME_PAGE_PROJECT_DISPLAY_SELECTOR).find(HomeDomConstants.HOME_PAGE_CAROUSEL_ELEMENT_PROJECT_TITLE_SELECTOR).invoke('text').then((h5Text) => {
      EndToEndTestUtils.clickElement(cy.get(HomeDomConstants.HOME_PAGE_PROJECT_DISPLAY_SELECTOR), true);
      cy.wait('@' + HttpInterceptorAliasConstants.GET_PROJECT_BY_ID_ALIAS);
      cy.wait('@' + HttpInterceptorAliasConstants.GET_PROJECT_DETAILS_BY_PROJECT_ID);
      cy.get(ProjectDomConstants.PROJECT_DETAILS_PAGE_TITLE).should('contain', h5Text);
    });
  });
});
