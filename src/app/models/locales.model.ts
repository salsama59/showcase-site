/**
 * Locale Class representing the locale model
 */
export class Locale {

    /**
     * Creates an instance of locale.
     * @param localeId the locale id
     * @param localeCode the locale code
     * @param languageLabel the language label
     * @public
     * @constructor
     */
    public constructor(
        public localeId: string, 
        public localeCode: string, 
        public languageLabel: string,
        ){}
}
