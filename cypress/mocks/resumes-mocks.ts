import { HttpInterceptorAliasConstants } from "cypress/constants/http-interceptor-alias-constants";
import { HttpRequestUtils } from "cypress/utils/http-request-utils";
import { Resume } from "src/app/models/resume.model";

export class ResumesMocks {

    public static getResumes(url: string, response: Resume[]): void {
        HttpRequestUtils.interceptHttpGetRequest(url, response, HttpInterceptorAliasConstants.GET_RESUMES);
    };

    public static getResumeById(url: string, response: Resume[], id: string): void {
        const resumeToGet: Resume = <Resume> response.find(resume => {return resume.resumeId === id});
        HttpRequestUtils.interceptHttpGetRequest(url + '/' + id, resumeToGet, HttpInterceptorAliasConstants.GET_RESUME_BY_ID);
    };

}


