
/**
 * This class represent the SocialNetwork model.
 */
export class SocialNetwork {
/**
 * Creates an instance of SocialNetwork.
 * @constructor
 * @param socialNetworkLinkId  the social network link id
 * @param socialNetworkLinkName  the social network link name
 * @param socialNetworkLinkUrl the social network link url
 * @param socialNetworkImageName the social network image name
 */
 public constructor(
	public socialNetworkLinkId: string,
    public socialNetworkLinkName: string,
    public socialNetworkLinkUrl: string,
    public socialNetworkImageName: string
) {}
}
