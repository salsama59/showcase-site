import { SkillLevelType } from "../enums/skill-level-type";

/**
 * This class represent the skill model
 */
export class Skill {

    /**
     * Creates an instance of skill.
     * @param label the label
     * @param level the level
     * @public
     * @constructor
     */
    public constructor(
        public label: string,
        public level: SkillLevelType,
    ){}
}
