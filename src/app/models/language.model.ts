import { LanguageLevelType } from "../enums/language-level-type";

/**
 * This class represent the language model
 */
export class Language {

   /**
    * Creates an instance of language.
    * @param label the label
    * @param level the level
    * @public
    * @constructor
    */
   public constructor(
        public label: string,
        public level: LanguageLevelType,
    ){}
}
