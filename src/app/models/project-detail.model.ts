import { ProjectMetadatas } from "./project-metadatas.model";

/**
 * This class represent the Project detail model.
 */
export class ProjectDetail {

    /**
     * Creates an instance of project detail.
     * @param projectDetailId the project detail id
     * @param projectDetailProjectId the project detail project id
     * @param projectDetailIntroductionTranslationKey the project detail introduction translation key
     * @param projectDetailInstructionsTranslationKeys the project detail instructions translation keys
     * @param projectUrl the project url
     * @param projectMetadatas the project metadatas
     * @public
     */
    constructor(
        public projectDetailId: string, 
        public projectDetailProjectId: string, 
        public projectDetailIntroductionTranslationKey: string, 
        public projectDetailInstructionsTranslationKeys: string[], 
        public projectUrl: string, 
        public projectMetadatas: ProjectMetadatas | null
        ) {}
}
