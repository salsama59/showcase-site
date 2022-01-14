import { ProjectTypeEnum } from "../enums/project-type-enum";

export interface ProjectTypeFilter {
    filterId: string
    projectType: ProjectTypeEnum,
    filterName: string,
    isFilterActive: boolean
}
