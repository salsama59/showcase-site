import { HttpInterceptorAliasConstants } from "cypress/constants/http-interceptor-alias-constants";
import { HttpRequestUtils } from "cypress/utils/http-request-utils";
import { News } from "src/app/models/news.model";

export class NewsMocks {

    public static getNews(url: string, response: News[]) {
        HttpRequestUtils.interceptHttpGetRequest(url, response, HttpInterceptorAliasConstants.GET_NEWS_ALIAS);
    };

}


