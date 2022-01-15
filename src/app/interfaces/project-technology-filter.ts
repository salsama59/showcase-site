import { ProjectTechnologyEnum } from "../enums/project-technology-enum";

/**
 * Project technology filter interface
 */
export interface ProjectTechnologyFilter {
    /**
     * The project thecnology filter id
     */
    filterId: string
    /**
     * The project technology
     */
    projectTechnology: ProjectTechnologyEnum,
    /**
     * The project filter technology name
     */
    filterName: string,
    /**
     * The project techbnology filter value
     */
    isFilterActive: boolean
}
