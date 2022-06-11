import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { RouteConstants } from '../constants/route-constants';
import { HomeComponent } from '../home/home.component';
import { Locale } from '../models/locales.model';
import { ProjectComponent } from '../projects/project/project.component';
import { ProjectsComponent } from '../projects/projects.component';
import { LocalesResolver } from '../resolvers/locales.resolver';
import { TranslationsResolver } from '../resolvers/translations.resolver';
import { ResumeComponent } from '../resumes/resume/resume.component';
import { ResumesComponent } from '../resumes/resumes.component';
import { LocaleService } from '../services/locale.service';
import { TranslationsService } from '../services/translations.service';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let headerComponent: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let translationsServiceSpy: jasmine.SpyObj<TranslationsService> = jasmine.createSpyObj('TranslationsService', ['get', 'loadTranslationsByLocale']);
  let localeServiceSpy: jasmine.SpyObj<LocaleService> = jasmine.createSpyObj('LocaleService', ['loadLocales', 'setCurrentLocale', 'setCurrentLanguageLabel', 'getCurrentLanguageLabel', 'getLocales']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          {
            path: RouteConstants.HOME_ROUTE_PATH,
            component: HomeComponent,
            resolve: [TranslationsResolver, LocalesResolver]
          },
          {
            path: RouteConstants.PROJECTS_ROUTE_PATH,
            component: ProjectsComponent,
            resolve: [TranslationsResolver, LocalesResolver]
          },
          { path: RouteConstants.PROJECT_VIEW_MODE_ROUTE_PATH, 
            component: ProjectComponent ,
            resolve: [TranslationsResolver, LocalesResolver]
          },
          { path: RouteConstants.RESUMES_ROUTE_PATH, 
            component: ResumesComponent, 
            resolve: [TranslationsResolver, LocalesResolver],
            children: [
              { path: RouteConstants.RESUME_VIEW_MODE_ROUTE_PATH, component: ResumeComponent }
            ]
          }
        ]),
        FormsModule
      ],
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: HttpClient },
        { provide: TranslationsService, useValue: translationsServiceSpy },
        { provide: LocaleService, useValue: localeServiceSpy }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    translationsServiceSpy.get.and.callFake((key) => {
      if(key === 'header.resumes.link.text') {
        return 'Resume';
      }

      if(key === 'header.projects.link.text') {
        return 'Projects';
      }

      if(key === 'header.home.link.text') {
        return 'Home';
      }
      return '';
    });
    translationsServiceSpy.loadTranslationsByLocale.and.callFake(() => of(true));

    localeServiceSpy.getLocales.and.callFake(() => {return [
      new Locale('qds456qs4d54sq', 'fr-FR', 'Français'),
      new Locale('sq78d987qs4c4<98w51', 'en-US', 'Anglais')
    ];});
    localeServiceSpy.loadLocales.and.callFake(() => of(true));
    
    fixture = TestBed.createComponent(HeaderComponent);
    headerComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the header component', () => {
    expect(headerComponent).toBeTruthy();
  });

  it('should render the Home link', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('header nav div#navbarNav ul > li a').item(0).textContent).toContain('Home');
  });

  it('should render the Resume link', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('header nav div#navbarNav ul > li a').item(1).textContent).toContain('Resume');
  });

  it('should render the Projects link', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('header nav div#navbarNav ul > li a').item(2).textContent).toContain('Projects');
  });

  it('should switch language', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    headerComponent.onLanguageSwitch('en-US', 'English');
    expect(compiled.querySelectorAll('header nav div#navbarNav ul > li a').item(2).textContent).toContain('Projects');
  });
});
