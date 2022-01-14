export class EndToEndTestUtils {

    public static getNthElement(cypressObject : Cypress.cy, elementsSelector: string, elementIndex: number): Cypress.Chainable {
        return cypressObject.get(elementsSelector).eq(elementIndex);
    }

    public static clickElement(element : Cypress.Chainable): Cypress.Chainable {
        return element.click();
    }
}
