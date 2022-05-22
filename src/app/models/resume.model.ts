import { Detail } from "./detail.model";
import { Education } from "./education.model";
import { EmploymentHistory } from "./employment-history.model";
import { Language } from "./language.model";
import { Skill } from "./skill.model";

/**
 * This class represent the resume model
 */
export class Resume {

    /**
     * Creates an instance of resume.
     * @param resumeId the resume id
     * @param isDefault the default resume flag
     * @param detail the detail
     * @param skills the skills
     * @param hobbyTranslationKeys the hobby translation keys
     * @param languages the languages
     * @param profileTranslationKey the profile translation key
     * @param employmentHistories the employment histories 
     * @param educations the educations
     * @public
     * @constructor
     */
    public constructor(
        public resumeId: string,
        public isDefault: boolean,
        public detail: Detail,
        public skills: Skill[],
        public hobbyTranslationKeys: string[],
        public languages: Language[],
        public profileTranslationKey: string,
        public employmentHistories: EmploymentHistory[],
        public educations: Education[]
    ){}
}
