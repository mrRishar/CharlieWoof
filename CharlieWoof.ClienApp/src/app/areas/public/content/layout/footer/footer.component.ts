import { Component, OnInit, HostBinding, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
// import { LayoutConfigService } from '../../../core/services/layout-config.service';
import * as objectPath from 'object-path';
@Component({
	selector: 'm-app-footer',
	templateUrl: './footer.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	styleUrls: [
		'./../../../css/bootstrap.css',
		'./../../../plugins/revolution/css/settings.css',
		'./../../../plugins/revolution/css/layers.css',
		'./../../../plugins/revolution/css/navigation.css',
		'./../../../css/style.css',
		'./../../../css/responsive.css',
		'./../../../css/color-switcher-design.css',
		'./../../../css/color-themes/default-theme.css',
		'./footer.component.css',
	]
})

export class FooterComponent implements OnInit {

	public config: any;

	constructor(
		private router: Router,
		// private layoutConfigService: LayoutConfigService,
		// private subheaderService: SubheaderService
	) {
	}

	ngOnInit(): void { }
}
