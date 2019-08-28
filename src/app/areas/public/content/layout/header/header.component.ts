import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import { HeaderService } from '../../../../../core/services/layout/header.service';
import {
	NavigationCancel,
	NavigationEnd,
	NavigationStart,
	RouteConfigLoadEnd,
	RouteConfigLoadStart,
	Router
} from '@angular/router';
import { LayoutRefService } from '../../../../../core/services/layout/layout-ref.service';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { PageBuilderDataService } from '../../../../control-panel/content/pages/pages-builder/services/pages-builder.services';
import { EnumNames } from '../../../../constants/enum-names';

@Component({
	selector: 'm-app-header',
	templateUrl: './header.component.html',
	styleUrls: [
		'./../../../css/bootstrap.css',
		'./../../../plugins/revolution/css/settings.css',
		'./../../../plugins/revolution/css/layers.css',
		'./../../../plugins/revolution/css/navigation.css',
		'./../../../css/style.css',
		'./../../../css/responsive.css',
		'./../../../css/color-switcher-design.css',
		'./../../../css/color-themes/default-theme.css',
		'./header.component.css',
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, AfterViewInit {

	@ViewChild('mHeader') mHeader: ElementRef;
	public EnumNames = EnumNames;
	public listMagicPages = [];
	public Content = '';
	public Title = '';
	public SeoTitle = '';
	public SeoDescription = '';
	public SeoKeywords = '';

	constructor(
		private router: Router,
		private layoutRefService: LayoutRefService,
		// public headerService: HeaderService,
		public loader: LoadingBarService,
		private pageBuilderDataService: PageBuilderDataService,

	) {
		// page progress bar percentage
		this.router.events.subscribe(event => {
			if (event instanceof NavigationStart) {
				// set page progress bar loading to start on NavigationStart event router
				this.loader.start();
			}
			if (event instanceof RouteConfigLoadStart) {
				this.loader.increment(35);
			}
			if (event instanceof RouteConfigLoadEnd) {
				this.loader.increment(75);
			}
			if (event instanceof NavigationEnd || event instanceof NavigationCancel) {
				// set page progress bar loading to end on NavigationEnd event router
				this.loader.complete();
			}
		});
	}

	ngOnInit() {
		this.pageBuilderDataService.getSections().subscribe(
		  data => {
			this.listMagicPages = data.result;
		  });
	  }
	
	  public getMagicPageForType(magicPageType) {
			return this.listMagicPages.filter(item => item.Type === magicPageType)[0];
	  }

	ngAfterViewInit(): void {
		// keep header element in the service
		//	this.layoutRefService.addElement('header', this.mHeader.nativeElement);
	}
}
