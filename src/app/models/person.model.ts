import { Address } from "./address.model";
import { Contact } from "./contact.model";

/**
 * This class represent the person model
 */
export class Person {

    /**
     * Creates an instance of person.
     * @param firstName the first name
     * @param familyName the family name
     * @param birthDate the birth date
     * @param contact the contact
     * @param address the address
     * @public
     * @constructor
     */
    public constructor(
        public firstName: string,
        public familyName: string,
        public birthDate: Date,
        public contact: Contact,
        public address: Address
    ){}
}
