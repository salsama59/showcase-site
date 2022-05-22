/**
 * This class represent the education model
 */
export class Education {

    /**
     * Creates an instance of education.
     * @param degreeTranslationKey the degree translation key
     * @param school the school
     * @param startDate the start date
     * @param endDate the end date
     * @param city the city
     * @param descriptionTranslationKey the description translation key
     * @public
     * @constructor
     */
    public constructor(
        public degreeTranslationKey: string,
        public school: string,
        public startDate: Date,
        public endDate: Date | null,
        public city: string,
        public descriptionTranslationKey: string | undefined
    ){}
}
