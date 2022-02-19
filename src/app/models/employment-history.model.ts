import { SkillLevelType } from "../enums/skill-level-type";

/**
 * This class represent the employmentHistory model
 */
export class EmploymentHistory {

    /**
     * Creates an instance of employment history.
     * @param jobTitle the job title
     * @param company the company
     * @param startDate the start date
     * @param endDate the end date
     * @param city the city
     * @param descriptions the descriptions
     * @public
     * @constructor
     */
    public constructor(
        public jobTitle: string,
        public company: string,
        public startDate: Date,
        public endDate: Date | null,
        public city: string,
        public descriptions: string[]
    ){}
}
