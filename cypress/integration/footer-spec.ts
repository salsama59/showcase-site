import { FooterDomConstants } from "cypress/constants/footer-dom-constants"
import { FooterPageObject } from "cypress/page/footer.po";
import pkg from 'package.json';

describe('The footer element end to end test', () => {
    it('should display the copyright', () => {
      cy.visit('/');
      const copyrightPrefix: string = '© Copyright ';
		const developerName: string = ' Saül YEPONDE';
		const startYear: string = '2022';
		const currentYear: string = new Date().getFullYear().toString();
		if (currentYear === startYear) {
            FooterPageObject.getFooterElement(FooterDomConstants.FOOTER_COPYRIGHT_ELEMENT_ID).should('have.text', copyrightPrefix + currentYear + developerName);
		} else {
            FooterPageObject.getFooterElement(FooterDomConstants.FOOTER_COPYRIGHT_ELEMENT_ID).should('have.text', copyrightPrefix + startYear + '-' + currentYear + developerName);
		}
    });

    it('should display the application version', () => {
	cy.visit('/');
      FooterPageObject.getFooterElement(FooterDomConstants.FOOTER_VERSION_ELEMENT_ID).should('have.text', 'Version : ' + pkg.version);
    });

    it('should display the linkedIn social network link', () => {
	cy.visit('/');
      FooterPageObject.getFooterLinkElement(FooterDomConstants.FOOTER_LINKEDIN_SOCIAL_NETWORK_ELEMENT_ID).should('have.text', 'LinkedIn\u00A0\u0020');
    });

    it('should display the Git hub social network link', () => {
	cy.visit('/');
      FooterPageObject.getFooterLinkElement(FooterDomConstants.FOOTER_GITHUB_SOCIAL_NETWORK_ELEMENT_ID).should('have.text', 'Git Hub\u00A0\u0020');
    });

    it('should make the linkedIn social network link navigable', () => {
	cy.visit('/');
      FooterPageObject.getFooterLinkElement(FooterDomConstants.FOOTER_LINKEDIN_SOCIAL_NETWORK_ELEMENT_ID).should('have.attr', 'href').and('equal', 'https://www.linkedin.com/in/saül-yeponde-3ba27b82');
    });

    it('should make the Git hub social network link navigable', () => {
	cy.visit('/');
      FooterPageObject.getFooterLinkElement(FooterDomConstants.FOOTER_GITHUB_SOCIAL_NETWORK_ELEMENT_ID).should('have.attr', 'href').and('equal', 'https://github.com/salsama59');
    });
});

  