import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { SocialNetwork } from '../models/social-network.model';
import { SocialNetworksService } from '../services/social-networks.service';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
	let httpClientSpy: jasmine.SpyObj<HttpClient>;
	let footerComponent: FooterComponent;
	let fixture: ComponentFixture<FooterComponent>;

	beforeEach(async () => {
		httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
		await TestBed.configureTestingModule({
			imports: [HttpClientModule],
			declarations: [FooterComponent],
			providers: [SocialNetworksService, {provide: HttpClient, useValue: httpClientSpy}],
			schemas: [CUSTOM_ELEMENTS_SCHEMA]
		}).compileComponents();
	});

	beforeEach(() => {
		const expectedSocialNetworks: Observable<SocialNetwork[]> = of([
			new SocialNetwork('4ssd4q6f4q', 'des', 'link', 'url', 'image.png'),
			new SocialNetwork('4ssd4q6f4q', 'des', 'link', 'url', 'image.png')
		]);
	  
		httpClientSpy.get.and.returnValue(expectedSocialNetworks);
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

	it('should display the social networks links', (done: DoneFn) => {
		const compiled = fixture.nativeElement;
		footerComponent.socialNetworksToDisplay.subscribe(socialNetworks => {
			expect(socialNetworks).toBeDefined();
			expect(socialNetworks).toHaveSize(2);
			for (const socialNetwork of socialNetworks) {
				expect(compiled.querySelector('#social-link-' + socialNetwork.socialNetworkLinkId).textContent).toContain(socialNetwork.socialNetworkLinkName);
			}
			done();
		});
	});
});

