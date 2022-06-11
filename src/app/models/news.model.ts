import { NewsType } from "../enums/news-type";

/**
 * News Class representing the news model
 */
export class News {

    /**
     * Creates an instance of news.
     * @param newsId the news id
     * @param newsDescriptionTranslationKey the news description translation key
     * @param newsType the news type
     * @param newsCreationDate the news creation date
     * @param isNewsActive the news state
     * @public
     * @constructor
     */
    public constructor(
        public newsId: string, 
        public newsDescriptionTranslationKey: string, 
        public newsType: NewsType, 
        public newsCreationDate: Date, 
        public isNewsActive: boolean
        ){}
}
