import { ProjectTechnologyEnum } from "../enums/project-technology-enum";
import { ProjectTypeEnum } from "../enums/project-type-enum";

/**
 * This class represent the Project model.
 */
export class Project {
    
/**
 * Creates an instance of Project.
 * @constructor
 * @param projectId  the project id
 * @param projectTitle  the project title
 * @param projectDescription the project description
 * @param projectType the project type
 * @param projectTags the project tags
 */
 public constructor(
	public projectId: number,
    public projectTitle: string,
    public projectDescription: string,
    public projectType: ProjectTypeEnum,
    public projectTags: ProjectTechnologyEnum[]
) {}
}
