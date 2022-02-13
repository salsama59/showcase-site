import { ProjectDomConstants } from "cypress/constants/project-dom-constants";
import { EndToEndTestUtils } from "cypress/utils/end-to-end-test-utils";


describe('The Project section end to end test', () => {
    it('should display the first project detail title', () => {
        EndToEndTestUtils.goToProjectDetailPage(cy, 0);
        cy.get(ProjectDomConstants.PROJECT_DETAILS_PAGE_TITLE).should('contain', 'Project 0 title');
    });

    it('should display the first project detail introduction title', () => {
        EndToEndTestUtils.goToProjectDetailPage(cy, 0);
        cy.get(ProjectDomConstants.PROJECT_DETAILS_INTRODUCTION_TITLE).should('contain', 'Introduction :');
    });

    it('should display the first project detail instructions title', () => {
        EndToEndTestUtils.goToProjectDetailPage(cy, 0);
        cy.get(ProjectDomConstants.PROJECT_DETAILS_INSTRUCTIONS_TITLE).should('contain', 'Instructions :');
    });

    it('should display the first project detail test title', () => {
        EndToEndTestUtils.goToProjectDetailPage(cy, 0);
        cy.get(ProjectDomConstants.PROJECT_DETAILS_TEST_TITLE).should('contain', 'Test the project :');
    });

    it('should posses a valid web project url', () => {
        EndToEndTestUtils.goToProjectDetailPage(cy, 0);
        cy.get(ProjectDomConstants.WEB_PROJECT_DETAILS_TEST_CONTENT).should('contain', 'Go to the project page').should('have.attr', 'href');
    });

    it('should posses a valid game project url', () => {
        EndToEndTestUtils.goToProjectDetailPage(cy, 1);
        cy.get(ProjectDomConstants.GAME_PROJECT_DETAILS_TEST_CONTENT).find('iframe').should('have.attr', 'src');
    });
});

  