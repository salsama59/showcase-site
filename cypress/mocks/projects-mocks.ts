import { HttpInterceptorAliasConstants } from "cypress/constants/http-interceptor-alias-constants";
import { HttpRequestUtils } from "cypress/utils/http-request-utils";
import { Project } from "src/app/models/project.model";

export class ProjectsMocks {

    public static getProjects(url: string, response: Project[]) {
        HttpRequestUtils.interceptHttpGetRequest(url, response, HttpInterceptorAliasConstants.GET_PROJECTS_ALIAS);
    };

    public static getProjectById(url: string, response: Project[], id: string) {
        const projectToGet: Project = <Project> response.find(project => {return project.projectId === id});
        HttpRequestUtils.interceptHttpGetRequest(url + '/' + id, projectToGet, HttpInterceptorAliasConstants.GET_PROJECT_BY_ID_ALIAS);
    };

}


