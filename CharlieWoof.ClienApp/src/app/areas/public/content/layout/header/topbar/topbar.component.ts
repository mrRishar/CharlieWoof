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

	constructor(
		private layoutConfigService: LayoutConfigService,
		private router: Router
	) {
		this.layoutConfigService.onLayoutConfigUpdated$.subscribe(model => {
			const config = model.config;
			this.searchType = objectPath.get(config, 'header.search.type');
		});
	}

	ngOnInit(): void {}
	ngAfterViewInit(): void {}
}
