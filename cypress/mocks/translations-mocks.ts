import { HttpInterceptorAliasConstants } from "cypress/constants/http-interceptor-alias-constants";
import { HttpRequestUtils } from "cypress/utils/http-request-utils";
import { Translation } from "src/app/models/translation.model";

export class TranslationsMocks {

    public static getTranslationsByCurrentLocale(url: string, response: Translation[]): void {
        HttpRequestUtils.interceptHttpGetRequest(url + '/current-locale', response, HttpInterceptorAliasConstants.GET_TRANSLATIONS_BY_CURRENT_LOCALE);
    };

    public static getTranslationsByLanguageCode(url: string, response: Translation[], languageCode: string): void {
        const translationsToGet: Translation[] = <Translation[]> response.filter(translation => {return translation.languageCode === languageCode});
        HttpRequestUtils.interceptHttpGetRequest(url + '/' + languageCode, translationsToGet, HttpInterceptorAliasConstants.GET_TRANSLATIONS_BY_LANGUAGE_CODE);
    };

}


