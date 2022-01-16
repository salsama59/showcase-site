import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the home component', () => {
    expect(component).toBeTruthy();
  });

  it('should update the current recommended project description', () => {
    expect(component.currentRecommendedProjectDescription).toEqual(component.recommendedProjects[0].projectDescription);
    component.onCarouselSlideFinished({
      to: 1
    });
    expect(component.currentRecommendedProjectDescription).toEqual(component.recommendedProjects[1].projectDescription);
  });

  it('should return a full Elapsed time label representation', () => {
    const elapsedTimeLabel: string = component.getElapsedTimeLabelRepresentation(new Date(2000, 6, 1));
    expect(elapsedTimeLabel).toContain("month(s)");
    expect(elapsedTimeLabel).toContain("day(s)");
    expect(elapsedTimeLabel).toContain("hour(s)");
    expect(elapsedTimeLabel).toContain("minute(s)");
  });

  it('should render the page title', () => {
    const compiled = fixture.debugElement;
		expect(
			compiled.query(By.css('h1.home-page-title')).nativeElement
		).toBeTruthy();
  });

  it('should render the introduction title', () => {
    const compiled = fixture.debugElement;
		expect(
			compiled.query(By.css('h3.introduction-title')).nativeElement
		).toBeTruthy();
  });

  it('should render the news title', () => {
    const compiled = fixture.debugElement;
		expect(
			compiled.query(By.css('h3.news-title')).nativeElement
		).toBeTruthy();
  });

  it('should render the recommended projects title', () => {
    const compiled = fixture.debugElement;
		expect(
			compiled.query(By.css('h3.recommended-projects-title')).nativeElement
		).toBeTruthy();
  });
});