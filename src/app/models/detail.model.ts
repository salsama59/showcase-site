import { Person } from "./person.model";
import { SocialNetwork } from "./social-network.model";

/**
 * This class represent the detail model
 */
export class Detail {

    /**
     * Creates an instance of detail.
     * @param titleTranslationKey the title translation key
     * @param person the person
     * @param socialNetworks the social networks
     * @public
     * @constructor
     */
    public constructor(
        public titleTranslationKey: string,
        public person: Person,
        public socialNetworks: SocialNetwork[]
    ){}
}
