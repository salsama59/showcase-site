/**
 * Pagination link model class
 */
export class PaginationLink {
	/**
	 * Creates an instance of pagination link.
	 * @constructor
	 * @param uri the page uri
	 * @param pageNumber the page number
	 */
	public constructor(public uri: string, public pageNumber: number) {}
}
