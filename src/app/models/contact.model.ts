import { Detail } from "./detail.model";

/**
 * This class represent the contact model
 */
export class Contact {

    /**
     * Creates an instance of contact.
     * @param email the email address
     * @param phoneNumber the phone number
     * @public
     * @constructor
     */
    public constructor(
        public email: string,
        public phoneNumber: string
    ){}
}
