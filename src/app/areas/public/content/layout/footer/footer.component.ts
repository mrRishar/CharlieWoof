import { Component, OnInit, HostBinding, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
// import { LayoutConfigService } from '../../../core/services/layout-config.service';
import * as objectPath from 'object-path';
import { PageBuilderDataService } from '../../../../control-panel/content/pages/pages-builder/services/pages-builder.services';
import { EnumNames } from '../../../../constants/enum-names';
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
	public EnumNames = EnumNames;
	public listMagicPages = [];
	
	constructor(
		private router: Router,
		private pageBuilderDataService: PageBuilderDataService,
		// private layoutConfigService: LayoutConfigService,
		// private subheaderService: SubheaderService
	) {
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

}
