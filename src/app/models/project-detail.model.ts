import { ProjectMetadatas } from "./project-metadatas.model";

/**
 * This class represent the Project detail model.
 */
export class ProjectDetail {

    /**
     * Creates an instance of project detail.
     * @param projectDetailId the project detail id
     * @param projectDetailProjectId the project detail project id
     * @param projectDetailIntroduction the project detail introduction
     * @param projectDetailInstructions the project detail instructions
     * @param projectUrl the project url
     * @param projectMetadatas the project metadatas
     * @public
     */
    constructor(
        public projectDetailId: number, 
        public projectDetailProjectId: number, 
        public projectDetailIntroduction: string, 
        public projectDetailInstructions: string[], 
        public projectUrl: string, 
        public projectMetadatas: ProjectMetadatas | null
        ) {}
}
