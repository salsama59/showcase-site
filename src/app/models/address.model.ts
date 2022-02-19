/**
 * This class represent the address model
 */
export class Address {

    /**
     * Creates an instance of address.
     * @param street the street
     * @param city the city
     * @param country the country
     * @param postalCode the postal code
     * @public
     * @constructor
     */
    public constructor(
        public street: string,
        public city: string,
        public country: string,
        public postalCode: string
    ){}
}
