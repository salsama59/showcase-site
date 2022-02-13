import { ScreenRsolutionData } from "./screen-resolution-data.model";

/**
 * This class represent the Project metadatas model.
 */
export class ProjectMetadatas {
    
/**
 * Creates an instance of ProjectMetadatas.
 * @constructor
 * @param isFullScreenEnabled the project metadata full screen enabled flag
 * @param isAutoPlayEnabled  the project metadata auto play enabled flag
 * @param isTransparencyEnabled the project metadata transparency enabled flag
 * @param isScrollingEnabled the project metadata scrolling enabled flag
 * @param permissions the project permissions
 * @param screenResolutionData the screen resolution data
 */
 public constructor(
	public isFullScreenEnabled: boolean,
    public isAutoPlayEnabled: boolean,
    public isTransparencyEnabled: boolean,
    public isScrollingEnabled: boolean,
    public permissions: Array<string>,
    public screenResolutionData: ScreenRsolutionData
) {}
}
