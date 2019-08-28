import {
	Component,
	OnInit,
	HostBinding,
	Input,
	AfterViewInit,
	ChangeDetectionStrategy
} from '@angular/core';
import { LayoutConfigService } from '../../../../../../core/services/layout-config.service';
import * as objectPath from 'object-path';
import { Router } from '@angular/router';
import { MagicPage } from '../../../../../control-panel/content/pages/pages-builder/edit-page/magicPage';
import { PageBuilderDataService } from '../../../../../control-panel/content/pages/pages-builder/services/pages-builder.services';
import { map } from 'rxjs/internal/operators/map';
import { EnumDataService } from '../../../../../services/enams.service';
import { EnumNames } from '../../../../../constants/enum-names';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
	selector: 'm-app-topbar',
	templateUrl: './topbar.component.html',
	styleUrls: [
		'./../../../../css/bootstrap.css',
		'./../../../../plugins/revolution/css/settings.css',
		'./../../../../plugins/revolution/css/layers.css',
		'./../../../../plugins/revolution/css/navigation.css',
		'./../../../../css/style.css',
		'./../../../../css/responsive.css',
		'./../../../../css/color-switcher-design.css',
		'./../../../../css/color-themes/default-theme.css',
		'./topbar.component.css',
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})

export class TopbarComponent implements OnInit, AfterViewInit {
	// private url: string;
	@HostBinding('id') id = 'm_header_nav';
	@HostBinding('class')
	classes = 'm-stack__item m-stack__item--fluid m-header-head';

	@Input() searchType: any;
	
	public listMagicPages = [];
	public EnumNames = EnumNames;
	currentSection = 'scroll-to-services';

	constructor(
		private layoutConfigService: LayoutConfigService,
		private pageBuilderDataService: PageBuilderDataService,
		private router: Router,
		private _router: Router,
		private _route: ActivatedRoute,
		private _location: Location
		// private enumDataService: EnumDataService,
	) {
		this.layoutConfigService.onLayoutConfigUpdated$.subscribe(model => {
			const config = model.config;
			this.searchType = objectPath.get(config, 'header.search.type');
		});
	}

	ngOnInit(): void {
		this.pageBuilderDataService.getSections().subscribe(
			data => {
				this.listMagicPages = data.result;
			});

		this._route.params.subscribe(params => {
			this.currentSection = params['sectionId'];
			this.scrollTo(this.currentSection);
		});
	}

	public getMagicPageForType(magicPageType) {
		return this.listMagicPages.filter(item => item.Type === magicPageType)[0];
	}

	onSectionChange(sectionId: string) {
		this._location.go(sectionId);
		this.currentSection = sectionId;
	}

	scrollTo(section) {
		document.querySelector('#' + section)
			.scrollIntoView();
	}


	ngAfterViewInit(): void { }
}
