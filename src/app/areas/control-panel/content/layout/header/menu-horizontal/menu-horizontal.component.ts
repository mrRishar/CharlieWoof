import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Renderer, ViewChild, HostBinding, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import * as objectPath from 'object-path';
import { MenuHorizontalOffcanvasDirective } from '../../../../../../core/directives/menu-horizontal-offcanvas.directive';
import { MenuHorizontalDirective } from '../../../../../../core/directives/menu-horizontal.directive';
import { MenuHorizontalService } from '../../../../../../core/services/layout/menu-horizontal.service';
import { MenuConfigService } from '../../../../../../core/services/menu-config.service';
import { ClassInitService } from '../../../../../../core/services/class-init.service';
import { ControlPanelDataService } from '../../../../services/control-panel-data.service';

@Component({
	selector: 'm-app-menu-horizontal',
	templateUrl: './menu-horizontal.component.html',
	styleUrls: ['menu-horizontal.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuHorizontalComponent implements OnInit, AfterViewInit {
	@HostBinding('class') classes = '';
	@HostBinding('id') id = 'm_header_menu';
	@ViewChild('myDiv') private myDiv: ElementRef;
	@HostBinding('attr.mMenuHorizontalOffcanvas')
	mMenuHorOffcanvas: MenuHorizontalOffcanvasDirective;
	@HostBinding('attr.mMenuHorizontal')
	mMenuHorizontal: MenuHorizontalDirective;

	currentRouteUrl: any = '';
	activeItem: any;
	itemsWithAsides = [];
	public roleId: number = 0;
	public a: boolean = false;

	constructor(
		private el: ElementRef,
		public classInitService: ClassInitService,
		public menuHorService: MenuHorizontalService,
		private controlPanelDataService: ControlPanelDataService,
		private menuConfigService: MenuConfigService,
		private router: Router,
		private renderer: Renderer
	) {
		this.controlPanelDataService.getUserInfo().subscribe(
			result => {
				debugger
				this.roleId = result.result.role;
				this.setupMenu(this.roleId);
			});
		this.classes = this.menuHorService.menuClasses;
	}

	ngAfterViewInit(): void {
		Promise.resolve(null).then(() => {
			this.mMenuHorOffcanvas = new MenuHorizontalOffcanvasDirective(this.el);
			this.mMenuHorOffcanvas.ngAfterViewInit();

			this.mMenuHorizontal = new MenuHorizontalDirective(this.el);
			this.mMenuHorizontal.ngAfterViewInit();
		});
	}

	private setupMenu(roleId: number) {
		if (this.roleId === 1) {
			this.a = true;
			// const body = document.getElementById('asa')[0];
			// body.classList.remove('claaasss');
			this.renderer.setElementClass(this.myDiv.nativeElement, 'claaasss', false);
			//remove the class
			// body.classList.add('claaassss');   //add the class
		} else if(this.roleId === 3) {
			this.renderer.setElementClass(this.myDiv.nativeElement, 'claaasss', true);
			
		}
		// console.log(this.a);
	}
	ngOnInit(): void {
		this.controlPanelDataService.getUserInfo().subscribe(
			result => {
				debugger
				this.roleId = result.result.role;
				if (this.roleId === 1) {
					this.setupMenu(this.roleId);
				}
			});
		console.log(this.a);

		this.currentRouteUrl = this.router.url;
		this.menuHorService.menuList$.subscribe(menuItems => this.fillAsides(menuItems));

		this.shouldOverrideAsides();

		this.router.events
			.pipe(filter(event => event instanceof NavigationEnd))
			.subscribe(event => {
				this.currentRouteUrl = this.router.url;
				this.shouldOverrideAsides();
			});
	}

	shouldOverrideAsides() {
		const aside = this.getActiveItemAside();
		if (aside) {
			// override aside menu as secondary menu of current header menu
			this.menuConfigService.configModel.config.aside = aside;
			this.menuConfigService.setModel(this.menuConfigService.configModel);
		}
	}

	fillAsides(menuItems) {
		for (const menuItem of menuItems) {
			if (menuItem.aside) {
				this.itemsWithAsides.push(menuItem);
			}

			if (menuItem.submenu && menuItem.submenu.items) {
				this.fillAsides(menuItem.submenu.items);
			}
		}
	}

	getActiveItemAside() {
		if (this.currentRouteUrl === '') {
			return null;
		}

		for (const item of this.itemsWithAsides) {
			if (item.page && item.page === this.currentRouteUrl) {
				return item.aside;
			}
		}
	}

	getItemCssClasses(item) {
		let cssClasses = 'm-menu__item';

		if (objectPath.get(item, 'submenu')) {
			cssClasses += ' m-menu__item--submenu';
		}

		if (objectPath.get(item, 'resizer')) {
			cssClasses += ' m-menu__item--resize';
		}

		if (
			(objectPath.get(item, 'root') &&
				objectPath.get(item, 'submenu.type') === 'classic') ||
			parseInt(objectPath.get(item, 'submenu.width'), 2) > 0
		) {
			cssClasses += ' m-menu__item--rel';
		}

		const customClass = objectPath.get(item, 'custom-class');
		if (customClass) {
			cssClasses += ' ' + customClass;
		}

		if (objectPath.get(item, 'icon-only')) {
			cssClasses += ' m-menu__item--icon-only';
		}

		if (item.submenu && this.isMenuItemIsActive(item)) {
			cssClasses += ' m-menu__item--active';
		}

		return cssClasses;
	}

	getItemAttrLinkRedirect(menuItem): any {
		if (objectPath.get(menuItem, 'redirect')) {
			return '1';
		}

		return null;
	}

	getItemAttrResizeDesktopBreakpoint(menuItem) {
		if (objectPath.get(menuItem, 'resizer')) {
			return objectPath.get(menuItem, 'resize-breakpoint');
		}

		return null;
	}

	getItemAttrSubmenuToggle(menuItem) {
		let attrSubmenuToggle = 'hover';
		if (objectPath.get(menuItem, 'toggle') === 'click') {
			attrSubmenuToggle = 'click';
		} else if (objectPath.get(menuItem, 'submenu.type') === 'tabs') {
			attrSubmenuToggle = 'tabs';
		} else {
			// submenu toggle default to 'hover'
		}

		return attrSubmenuToggle;
	}

	getItemAttrSubmenuMode(menuItem) {
		return null;
	}

	getItemMenuSubmenuClass(menuItem) {
		let subClass = '';

		const subAlignment = objectPath.get(menuItem, 'submenu.alignment');
		if (subAlignment) {
			subClass += ' m-menu__submenu--' + subAlignment;
		}

		if (objectPath.get(menuItem, 'submenu.type') === 'classic') {
			subClass += ' m-menu__submenu--classic';
		}

		if (objectPath.get(menuItem, 'submenu.type') === 'tabs') {
			subClass += ' m-menu__submenu--tabs';
		}

		if (objectPath.get(menuItem, 'submenu.type') === 'mega') {
			if (objectPath.get(menuItem, 'submenu.width')) {
				subClass += ' m-menu__submenu--fixed';
			}
		}

		if (objectPath.get(menuItem, 'submenu.pull')) {
			subClass += ' m-menu__submenu--pull';
		}

		return subClass;
	}

	isMenuItemIsActive(item): boolean {
		if (item.submenu) {
			return this.isMenuRootItemIsActive(item);
		}

		if (!item.page) {
			return false;
		}

		return item.page === this.currentRouteUrl;
	}

	isMenuRootItemIsActive(item): boolean {
		if (item.submenu.items) {
			for (const subItem of item.submenu.items) {
				if (this.isMenuItemIsActive(subItem)) {
					return true;
				}
			}
		}

		return false;
	}
}
