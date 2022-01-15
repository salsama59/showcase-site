import { ProjectTypeEnum } from "../enums/project-type-enum";

/**
 * Project type filter interface
 */
export interface ProjectTypeFilter {
    /**
     * the project type filter id
     */
    filterId: string,
    /**
     * the project type
     */
    projectType: ProjectTypeEnum,
    /**
     * the project type filter name
     */
    filterName: string,
    /**
     * the project type filter value
     */
    isFilterActive: boolean
}
