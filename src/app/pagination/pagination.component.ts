import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { PaginationLink } from '../models/pagination-link.model';

/**
 * Component used to manage the sections pagination
 */
@Component({
	selector: 'app-pagination',
	templateUrl: './pagination.component.html',
	styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit, OnDestroy {
	/**
	 * Start number of the page
	 */
	public static START_NUMBER: number = 1;

	/**
	 * Previous page button type
	 */
	PREVIOUS_PAGE: string = 'PREVIOUS';

	/**
	 * Next page button type
	 */
	NEXT_PAGE: string = 'NEXT';

	/**
	 * The pagination component target link
	 */
	@Input() targetLink: string = '';

	/**
	 * The total element number to paginate
	 */
	@Input() totalElementsNumber: number = 0;

	/**
	 * The element per page needed
	 */
	@Input() elementsPerPageNumber: number = 0;

	/**
	 * The paginated data subject to be informed of the totalElementsNumber value change
	 */
	@Input() paginatedDataSubject!: Subject<number>;

	/**
	 * The current page number
	 */
	currentPageNumber: number = PaginationComponent.START_NUMBER;

	/**
	 * The current page count
	 */
	currentPageCount: number = 0;

	/**
	 * The Pagination links to diplay
	 */
	paginationLinks: Array<PaginationLink> = new Array<PaginationLink>();

	/**
	 * The Paginated data subscription
	 */
	paginatedDataSubscription!: Subscription;

	/**
	 * Creates an instance of pagination component.
	 * @constructor
	 * @param activatedRoute  the activated route
	 */
	constructor(private activatedRoute: ActivatedRoute) {}

	/**
	 * Subscribe to the query params of the activated route to update the current page number.
	 * Subscribe to the paginated datas to update the maximum element number to paginate.
	 * Populate the pagination links by calculating how much page to show.
	 */
	ngOnInit(): void {
		this.activatedRoute.queryParams.subscribe((params: Params) => {
			if (params['page']) {
				this.currentPageNumber = +params['page'];
			}
		});

		this.paginatedDataSubscription = this.paginatedDataSubject.subscribe(
			(elementsCount) => {
				this.totalElementsNumber = elementsCount;
				this.initializePagination();
			}
		);
		this.initializePagination();
	}

	/**
	 * Unsubscribe to the paginated data change events.
	 */
	ngOnDestroy(): void {
		this.paginatedDataSubscription.unsubscribe();
	}

	/**
	 * Initializes the pagination links by calculation the current page count to display.
	 */
	initializePagination(): void {
		this.paginationLinks = new Array<PaginationLink>();
		this.currentPageCount = Math.ceil(
			this.totalElementsNumber / this.elementsPerPageNumber
		);

		for (
			let pageNumber: number = 1;
			pageNumber <= this.currentPageCount;
			pageNumber++
		) {
			const paginationLink: PaginationLink = new PaginationLink(
				this.targetLink,
				pageNumber
			);
			this.paginationLinks.push(paginationLink);
		}
	}

	/**
	 * Determines whether the current selected page is equals the page number
	 * @param pageNumber the page number
	 * @returns true if current selected page is equals the current page number, otherwise false.
	 */
	isCurrentSelectedPage(pageNumber: number): boolean {
		return this.currentPageNumber === pageNumber;
	}

	/**
	 * Update the current page number variable.
	 * @param selectedPageNumber the selected page number.
	 */
	onPageLinkClick(selectedPageNumber: number): void {
		this.currentPageNumber = selectedPageNumber;
		window.scroll(0, 0);
	}

	/**
	 * Determines whether the pagination side button should be disabled.
	 * @param buttonName the button name.
	 * @returns true if pagination side button disabled
	 */
	isPaginationSideButtonDisabled(buttonName: string): boolean {
		let isDisabled = false;
		switch (buttonName) {
			case this.PREVIOUS_PAGE:
				if (this.currentPageNumber <= PaginationComponent.START_NUMBER) {
					isDisabled = true;
				}
				break;
			case this.NEXT_PAGE:
				if (this.currentPageNumber >= this.currentPageCount) {
					isDisabled = true;
				}
				break;
			default:
				isDisabled = false;
				break;
		}
		return isDisabled;
	}
}
