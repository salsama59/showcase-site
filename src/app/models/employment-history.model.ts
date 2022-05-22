import { SkillLevelType } from "../enums/skill-level-type";

/**
 * This class represent the employmentHistory model
 */
export class EmploymentHistory {

    /**
     * Creates an instance of employment history.
     * @param jobTitleTranslationKey the job title translation key
     * @param company the company
     * @param startDate the start date
     * @param endDate the end date
     * @param city the city
     * @param descriptionTranslationKeys the description translation keys
     * @public
     * @constructor
     */
    public constructor(
        public jobTitleTranslationKey: string,
        public company: string,
        public startDate: Date,
        public endDate: Date | null,
        public city: string,
        public descriptionTranslationKeys: string[]
    ){}
}
