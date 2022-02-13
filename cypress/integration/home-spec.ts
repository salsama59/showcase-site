import { HomeDomConstants } from "cypress/constants/home-dom-constants";
import { ProjectDomConstants } from "cypress/constants/project-dom-constants";
import { ProjectsDomConstants } from "cypress/constants/projects-dom-constants";
import { EndToEndTestUtils } from "cypress/utils/end-to-end-test-utils"

describe('The Home page end to end test', () => {
  it('Visits the home page', () => {
    cy.visit('/');
    cy.get(HomeDomConstants.HOME_PAGE_TITLE_GENERAL_TITLE_SELECTOR).should('contain', 'Welcome to my showcase site');
    cy.get(HomeDomConstants.HOME_PAGE_TITLE_INTRODUCTION_TITLE_SELECTOR).should('contain', 'Introduction :');
    cy.get(HomeDomConstants.HOME_PAGE_TITLE_NEWS_TITLE_SELECTOR).should('contain', `What's new ?`);
    cy.get(HomeDomConstants.HOME_PAGE_TITLE_RECOMMENDED_PROJECTS_TITLE_SELECTOR).should('contain', 'Recommended projects :');

    cy.get(HomeDomConstants.HOME_SECTIONS_HOME_LINK_SELECTOR).should('contain', 'The home page');
    cy.get(HomeDomConstants.HOME_SECTIONS_PROJECTS_LINK_SELECTOR).should('contain', 'The projects page');
    cy.get(HomeDomConstants.HOME_SECTIONS_CV_LINK_SELECTOR).should('contain', 'The CV page');

  });

  it('Should stay on the home page when clicking in the home page link at the section list', () => {
    cy.visit('/')
    EndToEndTestUtils.clickElement(cy.get(HomeDomConstants.HOME_SECTIONS_HOME_LINK_SELECTOR), true);
    cy.get(HomeDomConstants.HOME_PAGE_TITLE_GENERAL_TITLE_SELECTOR).should('contain', 'Welcome to my showcase site');
  });

  it('Should navigate to the project page when clicking in the projects page link at the section list', () => {
    cy.visit('/')
    EndToEndTestUtils.clickElement(cy.get(HomeDomConstants.HOME_SECTIONS_PROJECTS_LINK_SELECTOR), true);
    cy.get(ProjectsDomConstants.PROJECT_LIST_PAGE_TITLE).should('contain', 'Project list page');
  });

  it('Should navigate to the CV page when clicking in the CV page link at the section list', () => {
    cy.visit('/')
    EndToEndTestUtils.clickElement(cy.get(HomeDomConstants.HOME_SECTIONS_CV_LINK_SELECTOR), true);
    cy.get(HomeDomConstants.HOME_PAGE_TITLE_GENERAL_TITLE_SELECTOR).should('contain', 'Welcome to my showcase site');
  });

  it('Should navigate to the project detail page when clicking on the recommended projects caroussel', () => {
    cy.visit('/')
    cy.get(HomeDomConstants.HOME_PAGE_PROJECT_DISPLAY_SELECTOR).find(HomeDomConstants.HOME_PAGE_CAROUSEL_ELEMENT_PROJECT_TITLE_SELECTOR).invoke('text').then((h5Text) => {
      EndToEndTestUtils.clickElement(cy.get(HomeDomConstants.HOME_PAGE_PROJECT_DISPLAY_SELECTOR), true);
      cy.get(ProjectDomConstants.PROJECT_DETAILS_PAGE_TITLE).should('contain', h5Text);
    });
  });
});
