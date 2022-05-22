/**
 * This class represent the translation model
 */
export class Translation {

    /**
     * Creates an instance of translation.
     * @param translationId the translation id
     * @param languageCode the language code
     * @param translationKey the translation key
     * @param translationValue the translation value
     * @public
     * @constructor
     */
    constructor(public translationId: string,
        public languageCode: string,
        public translationKey: string,
        public translationValue: string){}
}
