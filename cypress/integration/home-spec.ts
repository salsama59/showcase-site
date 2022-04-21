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

describe('The Home page end to end test', () => {

  beforeEach(() => {
    cy.fixture<News[]>('news.json',).then(newsList => {
      NewsMocks.getNews(environment.showcaseBackendUrl + BackendEndpointConstants.NEWS_ENDPOINT_URI, newsList);
    });
    cy.fixture<SocialNetwork[]>('social-networks.json',).then(socialNetworks => {
      SocialNetworksMocks.getSocialNetworks(environment.showcaseBackendUrl + BackendEndpointConstants.SOCIAL_NETWORK_ENDPOINT_URI, socialNetworks);
    });
    cy.visit('/');
    cy.wait('@' + HttpInterceptorAliasConstants.GET_NEWS_ALIAS);
    cy.wait('@' + HttpInterceptorAliasConstants.GET_SOCIAL_NETWORKS_ALIAS);
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
      cy.get(ProjectDomConstants.PROJECT_DETAILS_PAGE_TITLE).should('contain', h5Text);
    });
  });
});
