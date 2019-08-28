import { AuthenticationService } from '../../../../../../../core/auth/authentication.service';
import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { UserModel } from '../../../../pages/users/edit-page/user';
import { ControlPanelDataService } from '../../../../../services/control-panel-data.service';
import { NotificationType } from '../../../../../../../enums/notification-type';
import { NotificationService } from '../../../../../services/notification.service';
import { map } from 'rxjs/operators';
import { OnChanges } from '@angular/core';
import { DoCheck } from '@angular/core';
import { AfterContentInit } from '@angular/core';

@Component({
	selector: 'm-app-user-profile',
	templateUrl: './user-profile.component.html',
	styleUrls: ['user-profile.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfileComponent implements OnInit, AfterContentInit {
	@HostBinding('class')
	// tslint:disable-next-line:max-line-length
	classes = 'm-nav__item m-topbar__user-profile m-topbar__user-profile--img m-dropdown m-dropdown--medium m-dropdown--arrow m-dropdown--header-bg-fill m-dropdown--align-right m-dropdown--mobile-full-width m-dropdown--skin-light';

	@HostBinding('attr.m-dropdown-toggle') attrDropdownToggle = 'click';

	@Input() avatar: string = './assets/app/media/images/images.png';
	@Input() avatarBg: SafeStyle = '';

	@ViewChild('mProfileDropdown') mProfileDropdown: ElementRef;


	public userModel: UserModel = new UserModel();
	public firstname = '';
	public secondname = '';
	public email = '';
	public photoUrl = '';
	public id = '';

	constructor(
		private router: Router,
		private authService: AuthenticationService,
		private sanitizer: DomSanitizer,
		private controlPanelDataService: ControlPanelDataService,
		private notificationService: NotificationService,

	) { }

	ngOnInit(): void {
		if (!this.avatarBg) {
			this.avatarBg = this.sanitizer.bypassSecurityTrustStyle('url(./assets/app/media/img/misc/user_profile_bg.jpg)');
		}
		this.controlPanelDataService.getUserInfo().subscribe(
			result => {
				if (result) {
					const userinfo = result.result;
					this.userModel.firstname = userinfo.name;
					this.userModel.secondname = userinfo.lastName;
					this.userModel.email = userinfo.email;
					this.userModel.phone = userinfo.phone;
					this.id = userinfo.Id;
				}
			},
			error => {
				if (error.status === 400) {
					this.notificationService.notify(NotificationType.Error, 'candidateDetailsLoadError');
				}
			});
	}

	onClick($event) {
	}
	ngAfterContentInit(): void {
		// this.controlPanelDataService.getUserInfo().subscribe(
		// 	result => {
		// 		if (result) {
		// 			const userinfo = result.result;
		// 			this.userModel.firstname = userinfo.name;
		// 			this.userModel.secondname = userinfo.lastName;
		// 			this.userModel.email = userinfo.email;
		// 			this.userModel.phone = userinfo.phone;
		// 			this.id = userinfo.Id;
		// 		}
		// 	},
		// 	error => {
		// 		if (error.status === 400) {
		// 			this.notificationService.notify(NotificationType.Error, 'candidateDetailsLoadError');
		// 		}
		// 	});
	}
	setFormData(user) {
		// this.userFrom.setValue({
		// 	'id': user.Id,
		// 	'firstname': user.Firstname,
		// 	'secondname': user.Secondname,
		// 	'email': user.Email,
		// 	'phone': user.Phone,
		// 	'role': user.Role,
		// 	'passwordHash': user.Role,
		// 	'street': user.Street,
		// 	'birthday': user.Birthday,
		// 	'note': user.Note,
		// });
	}

	public logout() {
		this.authService.logout(true);
	}
}
