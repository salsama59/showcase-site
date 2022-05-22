import { LanguageLevelType } from "../enums/language-level-type";

/**
 * This class represent the language model
 */
export class Language {

   /**
    * Creates an instance of language.
    * @param labelTranslationKey the label translation key
    * @param level the level
    * @public
    * @constructor
    */
   public constructor(
        public labelTranslationKey: string,
        public level: LanguageLevelType,
    ){}
}
