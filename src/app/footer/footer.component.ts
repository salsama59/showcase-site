import { Component, OnInit } from '@angular/core';
import pkg from 'package.json';
import { SocialNetwork } from '../models/social-network.model';
import { SocialNetworksService } from '../services/social-networks.service';

/**
 * Class representing the footer component.
 * @implements OnInit
 */
@Component({
	selector: 'app-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
	/**
	 * Copyright date of footer component containing the start year.
	 */
	public copyrightStartDate: string = '2022';

	/**
	 * Copyright current date of footer component containing the current year.
	 */
	public copyrightCurrentDate: string = '';

	/**
	 * Application version of footer component
	 */
	public applicationVersion: string = pkg.version;

	/**
	 * Developer name of footer component
	 */
	public developerName: string = 'Saül YEPONDE';

	/**
	 * Social links to display of footer component
	 */
	public socialNetworksToDisplay: SocialNetwork[] = [];

	/**
	 * Creates an instance of footer component.
	 * @param socialNetworkService the social networks service
	 */
	constructor(private socialNetworkService: SocialNetworksService){}

	/**
	 * Initialize the copyright date for display purpose.
	 */
	ngOnInit(): void {
		const todayDate: Date = new Date();
		this.copyrightCurrentDate = todayDate.getFullYear().toString();
		this.socialNetworksToDisplay = this.socialNetworkService.getSocialNetworks();
	}

	/**
	 * Gets copyrigth date display value
	 * @returns the copyrigth sentence
	 */
	getCopyrigthSentenceDisplay(): string {
		let displayResult: string;

		if (this.copyrightStartDate === this.copyrightCurrentDate) {
			displayResult = this.copyrightCurrentDate;
		} else {
			displayResult = this.copyrightStartDate + '-' + this.copyrightCurrentDate;
		}

		return displayResult;
	}
}
