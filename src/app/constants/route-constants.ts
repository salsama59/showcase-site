/**
 * Route constants class providing datas regarding routes
 */
export class RouteConstants {
    /**
     * Projects route path of route constants
     */
    public static PROJECTS_ROUTE_PATH: string = 'projects';

    /**
     * Home route path of route constants
     */
    public static HOME_ROUTE_PATH: string = '';

    /**
     * Project view mode route path of route constants
     */
    public static PROJECT_VIEW_MODE_ROUTE_PATH: string = RouteConstants.PROJECTS_ROUTE_PATH + '/:projectId/:mode';

    /**
     * Resume route path of route constants
     */
     public static RESUMES_ROUTE_PATH: string = 'resumes';

    /**
     * Resume view mode route path of route constants
     */
    public static RESUME_VIEW_MODE_ROUTE_PATH: string = ':resumeId/:mode';
}
