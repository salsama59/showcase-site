import { ResumeDomConstants } from "cypress/constants/resume-dom-constants";
import { ResumesDomConstants } from "cypress/constants/resumes-dom-constants";
import { EndToEndTestUtils } from "cypress/utils/end-to-end-test-utils";

describe('The Resume section end to end test', () => {
    it('should display the default resume', () => {
      EndToEndTestUtils.goToResumesPage(cy);
      cy.get(ResumeDomConstants.RESUME_ELEMENT_TITLE).should('contain', 'Another resumee');
      EndToEndTestUtils.getNthElement(cy, ResumesDomConstants.RESUMES_LINKS, 1).should('have.class', 'active');
    });

    it('should Change the resume display from the default to to another one', () => {
        EndToEndTestUtils.goToResumesPage(cy);
        EndToEndTestUtils.clickElement(EndToEndTestUtils.getNthElement(cy, ResumesDomConstants.RESUMES_LINKS, 0), true);
        cy.get(ResumeDomConstants.RESUME_ELEMENT_TITLE).should('contain', 'The resumee');
        EndToEndTestUtils.getNthElement(cy, ResumesDomConstants.RESUMES_LINKS, 0).should('have.class', 'active');
        EndToEndTestUtils.getNthElement(cy, ResumesDomConstants.RESUMES_LINKS, 1).should('not.have.class', 'active');
      });
});