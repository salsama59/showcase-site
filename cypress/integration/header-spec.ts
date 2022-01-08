import { HeaderDomConstants } from "cypress/constants/header-dom-constants"
import { EndToEndTestUtils } from "cypress/utils/end-to-end-test-utils"

describe('The header element end to end test', () => {
    it('Visits the application home page and check the Home link existence', () => {
      cy.visit('/')
      EndToEndTestUtils.getNthElement(cy, HeaderDomConstants.HEADER_LINKS, 0).should('contain', 'Home');
    });

    it('Visits the application home page and check the CV link existence', () => {
        cy.visit('/')
        EndToEndTestUtils.getNthElement(cy, HeaderDomConstants.HEADER_LINKS, 1).should('contain', 'CV');
    });

    it('Visits the application home page and check the Projects link existence', () => {
        cy.visit('/')
        EndToEndTestUtils.getNthElement(cy, HeaderDomConstants.HEADER_LINKS, 2).should('contain', 'Projects');
    });
});

  