import { HeaderDomConstants } from "cypress/constants/header-dom-constants"
import { HomeDomConstants } from "cypress/constants/home-dom-constants";
import { ProjectsDomConstants } from "cypress/constants/projects-dom-constants";
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

    it('Visits the application home page and click the Projects link', () => {
        cy.visit('/')
        EndToEndTestUtils.clickElement(cy.get(HeaderDomConstants.HEADER_PROJECTS_TAB_LINK), true);
        cy.get(ProjectsDomConstants.PROJECT_LIST_PAGE_TITLE).should('contain', 'Project list page');
    });

    it('Visits the application projects page and click the Home link', () => {
        EndToEndTestUtils.goToProjectListPage(cy);
        EndToEndTestUtils.clickElement(cy.get(HeaderDomConstants.HEADER_HOME_TAB_LINK), true);
        cy.get(HomeDomConstants.HOME_PAGE_TITLE_GENERAL_TITLE_SELECTOR).should('contain', 'Welcome to my showcase site');
    });
});

  