import { RouteConstants } from '../../src/app/constants/route-constants';
import { RouteModeConstants } from '../../src/app/constants/route-mode-constants';

export class EndToEndTestUtils {

    public static goToProjectListPage(cypressObject : Cypress.cy): void {
        cypressObject.visit('/' + RouteConstants.PROJECTS_ROUTE_PATH);
    }

    public static goToProjectDetailPage(cypressObject : Cypress.cy, projectId: number): void {
        cypressObject.visit('/' + RouteConstants.PROJECTS_ROUTE_PATH + '/' + projectId + '/' + RouteModeConstants.MODE_VIEW_CONSTANT);
    }

    public static getNthElement(cypressObject : Cypress.cy, elementsSelector: string, elementIndex: number): Cypress.Chainable {
        return cypressObject.get(elementsSelector).eq(elementIndex);
    }

    public static clickElement(element : Cypress.Chainable, isCheckBypass: boolean): Cypress.Chainable {
        if(isCheckBypass){
            return element.click({force: true});
        } else {
            return element.click();
        }
    }

    public static selectDropdownWithOptionLabel(element : Cypress.Chainable, optionLabel: string, isCheckBypass: boolean): Cypress.Chainable {
        if(isCheckBypass){
            return element.select(optionLabel, {force: true});
        } else {
            return element.select(optionLabel);
        }
    }

    public static selectDropdownWithOptionValue(element : Cypress.Chainable, optionValue: string | number, isCheckBypass: boolean): Cypress.Chainable {
        if(isCheckBypass){
            return element.select(optionValue, {force: true});
        } else {
            return element.select(optionValue);
        }
    }
}
