import { HttpInterceptorAliasConstants } from "cypress/constants/http-interceptor-alias-constants";
import { HttpRequestUtils } from "cypress/utils/http-request-utils";
import { Locale } from "src/app/models/locales.model";

export class LocalesMocks {

    public static getLocales(url: string, locale: string, response: Locale[]): void {
        const localesToGet: Locale[] = <Locale[]> response.filter(filteredLocale => {return filteredLocale.localeCode === locale})
        HttpRequestUtils.interceptHttpGetRequest(url , localesToGet, HttpInterceptorAliasConstants.GET_LOCALES);
    };

}


