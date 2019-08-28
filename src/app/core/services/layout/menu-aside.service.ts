import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import * as objectPath from 'object-path';

import { MenuConfigService } from '../menu-config.service';
import { ClassInitService } from '../class-init.service';
import { LayoutConfigService } from "../layout-config.service";
import { ControlPanelDataService } from '../../../areas/control-panel/services/control-panel-data.service';

@Injectable({
	providedIn: 'root',
})
export class MenuAsideService {
	public classes: string;
	public menuList$: BehaviorSubject<any[]> = new BehaviorSubject([]);
	public isDropdown: number = 0;
	public dropdownTimeout: number;
	public isScrollable: number = 0;
	public roleId: number = 0;

	constructor(
		private menuConfigService: MenuConfigService,
		private classInitService: ClassInitService,
		private layoutConfigService: LayoutConfigService,
		private controlPanelDataService: ControlPanelDataService,
	) {
		this.controlPanelDataService.getUserInfo().subscribe(
			result => {
				this.roleId = result.result.role;
				this.setupMenu(this.roleId);
			});
	}

	private setupMenu(roleId: number) {
		if (this.roleId === 1) {
			this.setMenuItems('aside');
		} else if (this.roleId === 3) {
			this.setMenuItems('asideGrummer');
		}
	}

	private setMenuItems(key: string) {
		this.menuConfigService.onMenuUpdated$.subscribe(model => {
			setTimeout(() => {
				this.menuList$.next(objectPath.get(model.config, `${key}.items`));
			});
		});

		this.layoutConfigService.onLayoutConfigUpdated$.subscribe(config => {
			const fixed = !objectPath.get(config, `config.${key}.left.fixed`);

			if (fixed) {
				this.isScrollable = 1;
				this.isDropdown = 0;
			}

			if (fixed && !objectPath.get(config, `config.menu.${key}.desktop_and_mobile.submenu.accordion`)) {
				this.isScrollable = 0;
				this.isDropdown = 1;
				this.dropdownTimeout = objectPath.get(config, `config.menu.${key}.desktop_and_mobile.submenu.dropdown.hover_timeout`);
			}
		});
	}
}
