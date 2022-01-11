import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
	let footerComponent: FooterComponent;
	let fixture: ComponentFixture<FooterComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [FooterComponent]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(FooterComponent);
		footerComponent = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create the footer component', () => {
		expect(footerComponent).toBeTruthy();
	});

	it('should calculate the current year on intialization', () => {
		expect(footerComponent.copyrightCurrentDate).toEqual(
			new Date().getFullYear().toString()
		);
	});

	it('should display the copyright with only the start year wich is the current year', () => {
		const currentYear: string = new Date().getFullYear().toString();
		const compiled = fixture.nativeElement;
		expect(compiled.querySelector('#app-copyright').textContent).toContain(
			'© Copyright ' + currentYear
		);
	});

	it('should display the copyright with same start year and current year', () => {
		const currentYear: string = new Date().getFullYear().toString();
		footerComponent.copyrightStartDate = '2019';
		footerComponent.ngOnInit();
		fixture.detectChanges();
		const compiled = fixture.nativeElement;
		expect(compiled.querySelector('#app-copyright').textContent).toContain(
			'© Copyright ' +
				footerComponent.copyrightStartDate +
				'-' +
				currentYear +
				' ' +
				footerComponent.developerName
		);
	});

	it('should display the social networks links', () => {
		const compiled = fixture.nativeElement;
		expect(footerComponent.socialNetworksToDisplay).toBeDefined();
		expect(footerComponent.socialNetworksToDisplay).toHaveSize(2);
		for (const socialNetwork of footerComponent.socialNetworksToDisplay) {
			expect(compiled.querySelector('#social-link-' + socialNetwork.socialNetworkLinkId).textContent).toContain(socialNetwork.socialNetworkLinkName);
		}
	});
});

