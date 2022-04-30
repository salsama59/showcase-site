import { HttpInterceptorAliasConstants } from "cypress/constants/http-interceptor-alias-constants";
import { HttpRequestUtils } from "cypress/utils/http-request-utils";
import { ProjectDetail } from "src/app/models/project-detail.model";

export class ProjectDetailsMocks {

    public static getProjectDetailsList(url: string, response: ProjectDetail[]) {
        HttpRequestUtils.interceptHttpGetRequest(url, response, HttpInterceptorAliasConstants.GET_PROJECT_DETAILS_LIST);
    };

    public static getProjectDetailsByProjectId(url: string, response: ProjectDetail[], projectId: string) {
        const projectDetailToGet: ProjectDetail = <ProjectDetail> response.find(projectDetail => {return projectDetail.projectDetailProjectId === projectId});
        HttpRequestUtils.interceptHttpGetRequest(url + '/' + projectId, projectDetailToGet, HttpInterceptorAliasConstants.GET_PROJECT_DETAILS_BY_PROJECT_ID);
    };

}


