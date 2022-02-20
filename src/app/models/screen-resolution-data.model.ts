/**
 * This class represent the Screen resolution data model.
 */
export class ScreenRsolutionData {
    
/**
 * Creates an instance of ProjectMetadatas.
 * @constructor
 * @param screenWidth the screen width
 * @param screenWidthUnit  the screen width unit
 * @param screenHeight the screen height
 * @param screenHeightUnit the screen height unit
 */
 public constructor(
    public screenWidth: number,
    public screenWidthUnit: string,
    public screenHeight: number,
    public screenHeightUnit: string,
) {}
}
