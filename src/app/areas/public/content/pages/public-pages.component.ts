import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import {
	Component,
	OnInit,
	HostBinding,
	Input,
	ViewChild,
	ElementRef,
	AfterViewInit,
	Inject,
	ChangeDetectionStrategy
} from '@angular/core';
import * as objectPath from 'object-path';
// import { LayoutConfigService } from '../../core/services/layout-config.service';
// import { ClassInitService } from '../../core/services/class-init.service';
import { BehaviorSubject } from 'rxjs';
// import { LayoutRefService } from '../../core/services/layout/layout-ref.service';
import { AnimationBuilder, AnimationPlayer, style, animate } from '@angular/animations';
// import { TranslationService } from '../../core/services/translation.service';
import './components/notifications/content//app.less';
import { ActivatedRoute } from '@angular/router';
// import './components/notifications/content/modal.less';
// import { DOCUMENT } from '@angular/common';
import { Location } from '@angular/common';

@Component({
	selector: 'm-app-public-pages',
	templateUrl: './public-pages.component.html',
	styleUrls: [
		'./../../../public/css/bootstrap.css',
		'./../../../public/plugins/revolution/css/settings.css',
		'./../../../public//plugins/revolution/css/layers.css',
		'./../../../public/plugins/revolution/css/navigation.css',
		'./../../../public/css/style.css',
		'./../../../public/css/responsive.css',
		'./../../../public/css/color-switcher-design.css',
		'./../../../public/css/color-themes/default-theme.css',
		'../pages/components/slider-section/slider-section.component.css'
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PublicPagesComponent implements OnInit, AfterViewInit {
	@HostBinding('class') classes = 'm-grid m-grid--hor m-grid--root m-page';
	@Input() selfLayout: any = 'blank';
	@Input() asideLeftDisplay: any;
	@Input() asideRightDisplay: any;
	@Input() asideLeftCloseClass: any;

	public player: AnimationPlayer;

	// class for the header container
	pageBodyClass$: BehaviorSubject<string> = new BehaviorSubject<string>('');

	@ViewChild('mContentWrapper') contenWrapper: ElementRef;
	@ViewChild('mContent') mContent: ElementRef;
	@ViewChild('services') public services: ElementRef;
	@ViewChild('appointment') public appointment: ElementRef;
	@ViewChild('prices') public prices: ElementRef;
	@ViewChild('fluid') public fluid: ElementRef;
	@ViewChild('testimonial') public testimonial: ElementRef;
	@ViewChild('contact') public contact: ElementRef;

	public currentSection = 'section1';


	// someSection:ElementRef
	constructor(
		private _router: Router,
		private _route: ActivatedRoute,
		private _location: Location,
		// private configService: LayoutConfigService,
		// public classInitService: ClassInitService,
		// private layoutRefService: LayoutRefService,
		private animationBuilder: AnimationBuilder,
		// @Inject(DOCUMENT) document
		// private translationService: TranslationService,
	) {
		// this.configService.onLayoutConfigUpdated$.subscribe(model => {
		// 	const config = model.config;

		// 	let pageBodyClass = '';
		// 	this.selfLayout = objectPath.get(config, 'self.layout');
		// 	if (this.selfLayout === 'boxed' || this.selfLayout === 'wide') {
		// 		pageBodyClass += ' m-container m-container--responsive m-container--xxl m-page__container';
		// 	}
		// 	this.pageBodyClass$.next(pageBodyClass);

		// 	this.asideLeftDisplay = objectPath.get(config, 'aside.left.display');

		// 	this.asideRightDisplay = objectPath.get(config, 'aside.right.display');
		// });

		// this.classInitService.onClassesUpdated$.subscribe((classes) => {
		// 	this.asideLeftCloseClass = objectPath.get(classes, 'aside_left_close');
		// });

		// animate page load
		this._router.events.subscribe(event => {
			if (event instanceof NavigationStart) {
				if (this.contenWrapper) {
					// hide content
					this.contenWrapper.nativeElement.style.display = 'none';
				}
			}
			if (event instanceof NavigationEnd) {
				if (this.contenWrapper) {
					// show content back
					this.contenWrapper.nativeElement.style.display = '';
					// animate the content
					this.animate(this.contenWrapper.nativeElement);
				}
			}
		});
	}

	ngOnInit(): void {
		this._route.params.subscribe(params => {
			this.currentSection = params['sectionId'];
			this.scrollTo(this.currentSection);
		});
	}

	scrollTo(section) {
		document.querySelector('#' + section).scrollIntoView();
	}


	onSectionChange(sectionId: string) {
		this._location.go(sectionId);
		this.currentSection = sectionId;
	}

	ngAfterViewInit(): void {
		setTimeout(() => {
			if (this.mContent) {
				// keep content element in the service
				// this.layoutRefService.addElement('content', this.mContent.nativeElement);
			}


		});
		setTimeout(() => {
			if (window.location.href === 'http://charliegroom.com.ua/#1') {
				this.moveToSection(this.services);
			}
			if (window.location.href === 'http://charliegroom.com.ua/#2') {
				this.moveToSection(this.appointment);
			}
			if (window.location.href === 'http://charliegroom.com.ua/#3') {
				this.moveToSection(this.prices);
			}
			if (window.location.href === 'http://charliegroom.com.ua/#4') {
				this.moveToSection(this.fluid);
			}
			if (window.location.href === 'http://charliegroom.com.ua/#5') {
				this.moveToSection(this.testimonial);
			}
			if (window.location.href === 'http://charliegroom.com.ua/#6') {
				this.moveToSection(this.contact);
			}

		}, 6000);
	}


	public moveToSection(someSection: ElementRef): void {
		someSection.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
	}


	/**
 * Animate page load
 */
	animate(element) {
		this.player = this.animationBuilder
			.build([
				style({ opacity: 0, transform: 'translateY(15px)' }),
				animate('500ms ease', style({ opacity: 1, transform: 'translateY(0)' })),
				style({ transform: 'none' }),
			])
			.create(element);
		this.player.play();
	}

}



/////////////// SCROLL_SECTION //////////////
	// scroll(id) {
	// 	let el = document.getElementById(id);
	// 	el.scrollIntoView(false);
	// }


	// scrollTo(className: string): void {
	// 	const elementList = document.querySelectorAll('.' + className);
	// 	const element = elementList[0] as HTMLElement;
	// 	element.scrollIntoView({ behavior: 'smooth' });
	// }

		// if (window.location.href === 'http://localhost:4200/#1') {
		// 	// this.scrollTo(this.cclassName);
		// 	this.scroll('scroll-to-services');
		// 	const el = document.getElementById('scroll-to-services');
		// 	el.scrollIntoView({ behavior: "smooth", block: "start" });
		// 	scrollTo();


		// }
	//////////////////////////
