export class HttpRequestUtils {

    public static interceptHttpGetRequest(endpointUrl: string, response: Object, alias: string): void {
        cy.intercept('GET', endpointUrl, response).as(alias);
    }
   
}