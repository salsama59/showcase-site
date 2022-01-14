import { ProjectsDomConstants } from "cypress/constants/projects-dom-constants";
import { EndToEndTestUtils } from "cypress/utils/end-to-end-test-utils";
import { RouteConstants } from '../../src/app/constants/route-constants';


describe('The Projects section end to end test', () => {
    it('should display the first project title', () => {
      cy.visit('/' + RouteConstants.PROJECTS_ROUTE_PATH);
      EndToEndTestUtils.getNthElement(cy, ProjectsDomConstants.PROJECT_ARTICLE_LIST, 0).should('contain', 'Project 0 title');
    });

    it('should display the first project description', () => {
      cy.visit('/' + RouteConstants.PROJECTS_ROUTE_PATH);
      EndToEndTestUtils.getNthElement(cy, ProjectsDomConstants.PROJECT_ARTICLE_LIST, 0).should('contain', 'This is the project 0 what else is there to say.');
    });

    it('should display the six projects', () => {
      cy.visit('/' + RouteConstants.PROJECTS_ROUTE_PATH);
      cy.get(ProjectsDomConstants.PROJECT_ARTICLE_LIST).should('have.length', 6);
    });
});

  