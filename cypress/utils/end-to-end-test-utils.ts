export class EndToEndTestUtils {

    public static getNthElement(cypressObject : Cypress.cy, elementsSelector: string, elementIndex: number): Cypress.Chainable {
        return cypressObject.get(elementsSelector).eq(elementIndex);
    }
}
