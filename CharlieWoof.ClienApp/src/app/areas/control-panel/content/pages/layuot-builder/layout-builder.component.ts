import { LayoutConfigStorageService } from '../../../../../core/services/layout-config-storage.service';
import { Component, OnInit, Input, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LayoutConfigService } from '../../../../../core/services/layout-config.service';
import { ClassInitService } from '../../../../../core/services/class-init.service';
import { LayoutConfig } from '../../../../../config/layout';

@Component({
	selector: 'm-app-layout-builder',
	templateUrl: './layout-builder.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutBuilderComponent implements OnInit {
	@Input() model: any;
	@ViewChild('builderForm') form: NgForm;

	constructor(
		private layoutConfigService: LayoutConfigService,
		private classInitService: ClassInitService,
		private layoutConfigStorageService: LayoutConfigStorageService
	) {
		this.layoutConfigService.onLayoutConfigUpdated$.subscribe(config => {
			this.model = config.config;
		});
	}

	ngOnInit(): void {}

	submitPreview(form: NgForm): void {
		this.layoutConfigService.setModel(new LayoutConfig(this.model));
	}

	resetPreview(event: Event): void {
		event.preventDefault();
		this.layoutConfigStorageService.resetConfig();
		location.reload();
	}
}
