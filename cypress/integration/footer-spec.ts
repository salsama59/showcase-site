import { FooterDomConstants } from "cypress/constants/footer-dom-constants"
import { HttpInterceptorAliasConstants } from "cypress/constants/http-interceptor-alias-constants";
import { LocalesMocks } from "cypress/mocks/locales-mocks";
import { NewsMocks } from "cypress/mocks/news-mocks";
import { ProjectsMocks } from "cypress/mocks/projects-mocks";
import { SocialNetworksMocks } from "cypress/mocks/social-networks-mocks";
import { TranslationsMocks } from "cypress/mocks/translations-mocks";
import { FooterPageObject } from "cypress/page/footer.po";
import pkg from 'package.json';
import { BackendEndpointConstants } from "src/app/constants/backend-endpoint-constants";
import { Locale } from "src/app/models/locales.model";
import { News } from "src/app/models/news.model";
import { Project } from "src/app/models/project.model";
import { SocialNetwork } from "src/app/models/social-network.model";
import { Translation } from "src/app/models/translation.model";
import { environment } from "src/environments/environment";

describe('The footer element end to end test', () => {

    beforeEach(() => {
      cy.fixture<News[]>('news.json',).then(newsList => {
        NewsMocks.getNews(environment.showcaseBackendUrl + BackendEndpointConstants.NEWS_ENDPOINT_URI, newsList);
      });
      cy.fixture<SocialNetwork[]>('social-networks.json',).then(socialNetworks => {
        SocialNetworksMocks.getSocialNetworks(environment.showcaseBackendUrl + BackendEndpointConstants.SOCIAL_NETWORK_ENDPOINT_URI, socialNetworks);
      });
      cy.fixture<Translation[]>('translations.json').then(translations => {
        TranslationsMocks.getTranslationsByCurrentLocale(environment.showcaseBackendUrl + BackendEndpointConstants.TRANSLATIONS_ENDPOINT_URI, 'en-US', translations);
      });
      cy.fixture<Project[]>('projects.json').then(projects => {
        ProjectsMocks.getProjects(environment.showcaseBackendUrl + BackendEndpointConstants.PROJECTS_ENDPOINT_URI, projects);
      });
      cy.fixture<Locale[]>('locales.json').then(locales => {
        LocalesMocks.getLocales(environment.showcaseBackendUrl + BackendEndpointConstants.LOCALES_ENDPOINT_URI, 'en-US', locales);
      });
      cy.visit('/');
      cy.wait('@' + HttpInterceptorAliasConstants.GET_NEWS_ALIAS);
      cy.wait('@' + HttpInterceptorAliasConstants.GET_SOCIAL_NETWORKS_ALIAS);
      cy.wait('@' + HttpInterceptorAliasConstants.GET_TRANSLATIONS_BY_CURRENT_LOCALE);
      cy.wait('@' + HttpInterceptorAliasConstants.GET_PROJECTS_ALIAS);
      cy.wait('@' + HttpInterceptorAliasConstants.GET_LOCALES);
    });

    it('should display the copyright', () => {
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
      FooterPageObject.getFooterElement(FooterDomConstants.FOOTER_VERSION_ELEMENT_ID).should('have.text', 'Version : ' + pkg.version);
    });

    it('should display the linkedIn social network link', () => {
      FooterPageObject.getFooterLinkElement(FooterDomConstants.FOOTER_LINKEDIN_SOCIAL_NETWORK_ELEMENT_ID).should('have.text', 'LinkedIn\u00A0\u0020');
    });

    it('should display the Git hub social network link', () => {
      FooterPageObject.getFooterLinkElement(FooterDomConstants.FOOTER_GITHUB_SOCIAL_NETWORK_ELEMENT_ID).should('have.text', 'Git Hub\u00A0\u0020');
    });

    it('should make the linkedIn social network link navigable', () => {
      FooterPageObject.getFooterLinkElement(FooterDomConstants.FOOTER_LINKEDIN_SOCIAL_NETWORK_ELEMENT_ID).should('have.attr', 'href').and('equal', 'https://www.linkedin.com/in/saül-yeponde-3ba27b82');
    });

    it('should make the Git hub social network link navigable', () => {
      FooterPageObject.getFooterLinkElement(FooterDomConstants.FOOTER_GITHUB_SOCIAL_NETWORK_ELEMENT_ID).should('have.attr', 'href').and('equal', 'https://github.com/salsama59');
    });
});

  