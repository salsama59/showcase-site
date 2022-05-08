import { HeaderDomConstants } from "cypress/constants/header-dom-constants"
import { HomeDomConstants } from "cypress/constants/home-dom-constants";
import { HttpInterceptorAliasConstants } from "cypress/constants/http-interceptor-alias-constants";
import { ProjectsDomConstants } from "cypress/constants/projects-dom-constants";
import { NewsMocks } from "cypress/mocks/news-mocks";
import { ProjectsMocks } from "cypress/mocks/projects-mocks";
import { SocialNetworksMocks } from "cypress/mocks/social-networks-mocks";
import { TranslationsMocks } from "cypress/mocks/translations-mocks";
import { EndToEndTestUtils } from "cypress/utils/end-to-end-test-utils"
import { BackendEndpointConstants } from "src/app/constants/backend-endpoint-constants";
import { News } from "src/app/models/news.model";
import { Project } from "src/app/models/project.model";
import { SocialNetwork } from "src/app/models/social-network.model";
import { Translation } from "src/app/models/translation.model";
import { environment } from "src/environments/environment";

describe('The header element end to end test', () => {

    beforeEach(() => {
        cy.fixture<News[]>('news.json',).then(newsList => {
            NewsMocks.getNews(environment.showcaseBackendUrl + BackendEndpointConstants.NEWS_ENDPOINT_URI, newsList);
        });
        cy.fixture<SocialNetwork[]>('social-networks.json',).then(socialNetworks => {
            SocialNetworksMocks.getSocialNetworks(environment.showcaseBackendUrl + BackendEndpointConstants.SOCIAL_NETWORK_ENDPOINT_URI, socialNetworks);
        });
        cy.fixture<Translation[]>('translations.json').then(translations => {
            TranslationsMocks.getTranslationsByCurrentLocale(environment.showcaseBackendUrl + BackendEndpointConstants.TRANSLATIONS_ENDPOINT_URI, translations);
        });
        cy.fixture<Project[]>('projects.json').then(projects => {
            ProjectsMocks.getProjects(environment.showcaseBackendUrl + BackendEndpointConstants.PROJECTS_ENDPOINT_URI, projects);
        });
        cy.visit('/');
        cy.wait('@' + HttpInterceptorAliasConstants.GET_NEWS_ALIAS);
        cy.wait('@' + HttpInterceptorAliasConstants.GET_SOCIAL_NETWORKS_ALIAS);
        cy.wait('@' + HttpInterceptorAliasConstants.GET_TRANSLATIONS_BY_CURRENT_LOCALE);
        cy.wait('@' + HttpInterceptorAliasConstants.GET_PROJECTS_ALIAS);
    });
    it('Visits the application home page and check the Home link existence', () => {
      cy.visit('/')
      EndToEndTestUtils.getNthElement(cy, HeaderDomConstants.HEADER_LINKS, 0).should('contain', 'Home');
    });

    it('Visits the application home page and check the Resume link existence', () => {
        cy.visit('/')
        EndToEndTestUtils.getNthElement(cy, HeaderDomConstants.HEADER_LINKS, 1).should('contain', 'Resume');
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

  