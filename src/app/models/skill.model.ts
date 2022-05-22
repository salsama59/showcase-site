import { SkillLevelType } from "../enums/skill-level-type";

/**
 * This class represent the skill model
 */
export class Skill {

    /**
     * Creates an instance of skill.
     * @param labelTranslationKey the label translation key
     * @param level the level
     * @public
     * @constructor
     */
    public constructor(
        public labelTranslationKey: string,
        public level: SkillLevelType,
    ){}
}
