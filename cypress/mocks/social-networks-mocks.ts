import { HttpInterceptorAliasConstants } from "cypress/constants/http-interceptor-alias-constants";
import { HttpRequestUtils } from "cypress/utils/http-request-utils";
import { SocialNetwork } from "src/app/models/social-network.model";

export class SocialNetworksMocks {

    public static getSocialNetworks(url: string, response: SocialNetwork[]) {
        HttpRequestUtils.interceptHttpGetRequest(url, response, HttpInterceptorAliasConstants.GET_SOCIAL_NETWORKS_ALIAS);
    };

}


