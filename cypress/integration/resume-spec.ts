import { HttpInterceptorAliasConstants } from "cypress/constants/http-interceptor-alias-constants";
import { ResumeDomConstants } from "cypress/constants/resume-dom-constants";
import { ResumesDomConstants } from "cypress/constants/resumes-dom-constants";
import { ResumesMocks } from "cypress/mocks/resumes-mocks";
import { SocialNetworksMocks } from "cypress/mocks/social-networks-mocks";
import { TranslationsMocks } from "cypress/mocks/translations-mocks";
import { EndToEndTestUtils } from "cypress/utils/end-to-end-test-utils";
import { BackendEndpointConstants } from "src/app/constants/backend-endpoint-constants";
import { Resume } from "src/app/models/resume.model";
import { SocialNetwork } from "src/app/models/social-network.model";
import { Translation } from "src/app/models/translation.model";
import { environment } from "src/environments/environment";

describe('The Resume section end to end test', () => {


    beforeEach(() => {
      cy.fixture<Resume[]>('resumes.json',).then(resumes => {
        ResumesMocks.getResumes(environment.showcaseBackendUrl + BackendEndpointConstants.RESUMES_ENDPOINT_URI, resumes);
        ResumesMocks.getResumeById(environment.showcaseBackendUrl + BackendEndpointConstants.RESUMES_ENDPOINT_URI, resumes, '62409b11411b32c3d7d6ce01');
        ResumesMocks.getResumeById(environment.showcaseBackendUrl + BackendEndpointConstants.RESUMES_ENDPOINT_URI, resumes, '62409b11411b32c3d7d6ce02');
      });
      cy.fixture<SocialNetwork[]>('social-networks.json',).then(socialNetworks => {
        SocialNetworksMocks.getSocialNetworks(environment.showcaseBackendUrl + BackendEndpointConstants.SOCIAL_NETWORK_ENDPOINT_URI, socialNetworks);
      });
      cy.fixture<Translation[]>('translations.json').then(translations => {
        TranslationsMocks.getTranslationsByCurrentLocale(environment.showcaseBackendUrl + BackendEndpointConstants.TRANSLATIONS_ENDPOINT_URI, 'en-US', translations);
      });
      EndToEndTestUtils.goToResumesPage(cy);
      cy.wait('@' + HttpInterceptorAliasConstants.GET_SOCIAL_NETWORKS_ALIAS);
      cy.wait('@' + HttpInterceptorAliasConstants.GET_RESUMES);
      cy.wait('@' + HttpInterceptorAliasConstants.GET_RESUME_BY_ID);
      cy.wait('@' + HttpInterceptorAliasConstants.GET_TRANSLATIONS_BY_CURRENT_LOCALE);
    });

    it('should display the default resume', () => {
      cy.get(ResumeDomConstants.RESUME_ELEMENT_TITLE).should('contain', 'Another resumee');
      EndToEndTestUtils.getNthElement(cy, ResumesDomConstants.RESUMES_LINKS, 1).should('have.class', 'active');
    });

    it('should Change the resume display from the default to to another one', () => {
        EndToEndTestUtils.clickElement(EndToEndTestUtils.getNthElement(cy, ResumesDomConstants.RESUMES_LINKS, 0), true);
        cy.get(ResumeDomConstants.RESUME_ELEMENT_TITLE).should('contain', 'The resumee');
        EndToEndTestUtils.getNthElement(cy, ResumesDomConstants.RESUMES_LINKS, 0).should('have.class', 'active');
        EndToEndTestUtils.getNthElement(cy, ResumesDomConstants.RESUMES_LINKS, 1).should('not.have.class', 'active');
      });
});