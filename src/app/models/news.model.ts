import { NewsType } from "../enums/news-type";

/**
 * News Class representing the news model
 */
export class News {

    /**
     * Creates an instance of news.
     * @param newsId the news id
     * @param newsDescription the news description
     * @param newsType the news type
     * @param newsCreationDate the news creation date
     * @param isNewsActive the news state
     * @public
     */
    public constructor(public newsId: number, public newsDescription: string, public newsType: NewsType, public newsCreationDate: Date, public isNewsActive: boolean){}
}
