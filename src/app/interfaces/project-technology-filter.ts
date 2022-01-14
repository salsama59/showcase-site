import { ProjectTechnologyEnum } from "../enums/project-technology-enum";

export interface ProjectTechnologyFilter {
    filterId: string
    projectTechnology: ProjectTechnologyEnum,
    filterName: string,
    isFilterActive: boolean
}
