import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject } from 'rxjs';
import { ProjectsComponent } from 'src/app/projects/projects.component';

import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
	let paginationComponent: PaginationComponent;
	let fixture: ComponentFixture<PaginationComponent>;
	const paginationSubject: Subject<number> = new Subject<number>();

	describe('with invalid route parameters', () => {
		beforeEach(async () => {
			await TestBed.configureTestingModule({
				imports: [
					CommonModule,
					RouterTestingModule.withRoutes([
						{
							path: 'projects',
							component: ProjectsComponent
						}
					])
				],
				declarations: [PaginationComponent],
				providers: [
					{
						provide: ActivatedRoute,
						useValue: {
							params: of({}),
							queryParams: of({ page: null }),
							snapshot: {
								queryParams: { page: null }
							},
							url: of([
								new UrlSegment('/', {}),
								new UrlSegment('projects', {})
							]),
							fragment: of('/projects')
						}
					}
				],
				schemas: [CUSTOM_ELEMENTS_SCHEMA]
			}).compileComponents();
		});

		beforeEach(() => {
			fixture = TestBed.createComponent(PaginationComponent);
			paginationComponent = fixture.componentInstance;
			paginationComponent.totalElementsNumber = 1;
			paginationComponent.paginatedDataSubject = paginationSubject;
			paginationComponent.targetLink = '';
			paginationComponent.elementsPerPageNumber = 5;
			fixture.detectChanges();
		});

		it('should create', () => {
			expect(paginationComponent).toBeTruthy();
		});
	});

	describe('with valid route parameters', () => {
		beforeEach(async () => {
			await TestBed.configureTestingModule({
				imports: [
					CommonModule,
					RouterTestingModule.withRoutes([
						{
							path: 'projects',
							component: ProjectsComponent
						}
					])
				],
				declarations: [PaginationComponent],
				providers: [
					{
						provide: ActivatedRoute,
						useValue: {
							params: of({}),
							queryParams: of({ page: 1 }),
							snapshot: { queryParams: { page: 1 } },
							url: of([
								new UrlSegment('/', {}),
								new UrlSegment('projects', {})
							]),
							fragment: of('/projects')
						}
					}
				],
				schemas: [CUSTOM_ELEMENTS_SCHEMA]
			}).compileComponents();
		});

		beforeEach(() => {
			fixture = TestBed.createComponent(PaginationComponent);
			paginationComponent = fixture.componentInstance;
			paginationComponent.totalElementsNumber = 1;
			paginationComponent.paginatedDataSubject = paginationSubject;
			paginationComponent.targetLink = '';
			paginationComponent.elementsPerPageNumber = 5;
			fixture.detectChanges();
		});

		it('should create', () => {
			expect(paginationComponent).toBeTruthy();
		});

		it('should refresh pagination when the elements count is updated', () => {
			paginationSubject.next(10);
			expect(paginationComponent.totalElementsNumber).toBe(10);
			expect(paginationComponent.currentPageCount).toBe(2);
			expect(paginationComponent.paginationLinks.length).toBe(2);
		});

		it('should update the current page number when the page link is clicked', () => {
			paginationComponent.onPageLinkClick(2);
			expect(paginationComponent.currentPageNumber).toBe(2);
		});

		it('should not disable the side button when an unknown button name is given', () => {
			const isButtonDisabled: boolean = paginationComponent.isPaginationSideButtonDisabled(
				'TEST'
			);
			expect(isButtonDisabled).toBeFalse();
		});

		it('should not disable the side button when the current page number is greater than the pagination start number for PREVIOUS_PAGE button', () => {
			paginationComponent.currentPageNumber = 2;
			const isButtonDisabled: boolean = paginationComponent.isPaginationSideButtonDisabled(
				paginationComponent.PREVIOUS_PAGE
			);
			expect(isButtonDisabled).toBeFalse();
		});

		it('should not disable the side button when the current page number is less than the current page count for NEXT_PAGE button', () => {
			paginationComponent.currentPageNumber = 0;
			const isButtonDisabled: boolean = paginationComponent.isPaginationSideButtonDisabled(
				paginationComponent.NEXT_PAGE
			);
			expect(isButtonDisabled).toBeFalse();
		});
	});
});
