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
 * @param projectTitleTranslationKey  the project title translation key
 * @param projectDescriptionTranslationKey the project description translation key
 * @param projectType the project type
 * @param projectTags the project tags
 * @param projectCreationDate the project creation date
 * @param projectLastModifiedDate the project last modified date
 */
 public constructor(
	public projectId: string,
    public projectTitleTranslationKey: string,
    public projectDescriptionTranslationKey: string,
    public projectType: ProjectTypeEnum,
    public projectTags: ProjectTechnologyEnum[],
    public projectCreationDate: Date,
    public projectLastModifiedDate: Date,
) {}
}
