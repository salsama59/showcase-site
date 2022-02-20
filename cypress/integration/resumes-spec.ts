import { ResumesDomConstants } from "cypress/constants/resumes-dom-constants";
import { EndToEndTestUtils } from "cypress/utils/end-to-end-test-utils";

describe('The Resumes section end to end test', () => {
    it('should display the resumes page title', () => {
      EndToEndTestUtils.goToResumesPage(cy);
      cy.get(ResumesDomConstants.RESUMES_LIST_PAGE_TITLE).should('contain', 'This is my resumes');
    });

    it('should display two resumes link', () => {
        EndToEndTestUtils.goToResumesPage(cy);
        cy.get(ResumesDomConstants.RESUMES_LINKS).should('have.length', 2);
        EndToEndTestUtils.getNthElement(cy, ResumesDomConstants.RESUMES_LINKS, 0).should('contain', 'The resumee');
        EndToEndTestUtils.getNthElement(cy, ResumesDomConstants.RESUMES_LINKS, 1).should('contain', 'Another resumee');
      });
});