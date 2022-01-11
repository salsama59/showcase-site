export class FooterPageObject {

    public static getFooterElement(elementId: string): Cypress.Chainable {
		return cy.get('app-footer div div#' + elementId);
	}

	public static getFooterLinkElement(elementLinkId: string): Cypress.Chainable {
		return cy.get('app-footer div a#' + elementLinkId);
	}


}