/**
 * This class represent the education model
 */
export class Education {

    /**
     * Creates an instance of education.
     * @param degree the degree
     * @param school the school
     * @param startDate the start date
     * @param endDate the end date
     * @param city the city
     * @param description the description
     * @public
     * @constructor
     */
    public constructor(
        public degree: string,
        public school: string,
        public startDate: Date,
        public endDate: Date | null,
        public city: string,
        public description: string | null
    ){}
}
