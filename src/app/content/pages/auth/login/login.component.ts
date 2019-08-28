import {
	Component,
	OnInit,
	Output,
	Input,
	ViewChild,
	OnDestroy,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	HostBinding
} from '@angular/core';
import { AuthenticationService } from '../../../../core/auth/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthNoticeService } from '../../../../core/auth/auth-notice.service';
import { NgForm } from '@angular/forms';
import * as objectPath from 'object-path';
import { TranslateService } from '@ngx-translate/core';
import { SpinnerButtonOptions } from '../../../partials/content/general/spinner-button/button-options.interface';
import { AuthenService } from './../../../../../app/areas/control-panel/services/authen.service';
// import { ControlPanelRoutingModule } from '../../../../areas/control-panel/cp-routing.module';
import { ControlPanelDataService } from '../../../../areas/control-panel/services/control-panel-data.service';
import { NotificationService } from '../../../../areas/control-panel/services/notification.service';
import { NotificationType } from '../../../../enums/notification-type';
import { NotificationComponent } from '../../../../areas/control-panel/components/notification/notification.component';
import { ClarityIcons } from '@clr/icons';

@Component({
	selector: 'm-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit, OnDestroy {
	public model: any = { email: '', password: '' };
	@HostBinding('class') classes: string = 'm-login__signin';
	@Output() actionChange = new Subject<string>();
	public loading = false;
	public   submitted = false;

	@Input() action: string;

	@ViewChild('f') f: NgForm;
	errors: any = [];

	spinner: SpinnerButtonOptions = {
		active: false,
		spinnerSize: 18,
		raised: true,
		buttonColor: 'primary',
		spinnerColor: 'accent',
		fullWidth: false
	};
	controlPanelUrl: string = 'ControlPanel';
	constructor(
		private activatedRoute: ActivatedRoute,
		private authService: AuthenticationService,
		private router: Router,
		public authNoticeService: AuthNoticeService,
		private translate: TranslateService,
		// private cdr: ChangeDetectorRef,
		public controlPanelDataService: ControlPanelDataService,
		public authenticationService: AuthenService,
		private notificationService: NotificationService,
	) { }

	submit() {
		this.spinner.active = true;
		this.loading = true;
		if (this.validate(this.f)) {
			this.controlPanelDataService.getAuthentication(this.model.email, this.model.password).subscribe(response => {
				localStorage.setItem('accessToken', response);
				if (typeof response !== undefined) {
					window.location.reload();
					this.router.navigate(['ControlPanel']);
				}
			},
				error => {
					if (error.status === 400) {
						this.notificationService.notify(NotificationType.Error, 'signInErrork');
						alert('signInError');
					} if (error.status === 403) {
						alert('forbiddenError');
						this.notificationService.notify(NotificationType.Error, 'forbiddenError');
					} if (error.status === 401) {
						this.submitted = true;
						this.notificationService.notify(NotificationType.Error, 'forbiddenError');
					}
					this.spinner.active = false;
					// this.cdr.detectChanges();
				});
		}
	}

	ngOnInit(): void {
		// demo message to show
		if (!this.authNoticeService.onNoticeChanged$.getValue()) {
			const initialNotice = `Use account
			<strong>admin@demo.com</strong> and password
			<strong>demo</strong> to continue.`;
			this.authNoticeService.setNotice(initialNotice, 'success');
		}
	}

	ngOnDestroy(): void {
		this.authNoticeService.setNotice(null);
	}

	validate(f: NgForm) {
		if (f.form.status === 'VALID') {
			return true;
		}

		this.errors = [];
		if (objectPath.get(f, 'form.controls.email.errors.email')) {
			this.errors.push(this.translate.instant('AUTH.VALIDATION.INVALID', { name: this.translate.instant('AUTH.INPUT.EMAIL') }));
		}
		if (objectPath.get(f, 'form.controls.email.errors.required')) {
			this.errors.push(this.translate.instant('AUTH.VALIDATION.REQUIRED', { name: this.translate.instant('AUTH.INPUT.EMAIL') }));
		}

		if (objectPath.get(f, 'form.controls.password.errors.required')) {
			this.errors.push(this.translate.instant('AUTH.VALIDATION.INVALID', { name: this.translate.instant('AUTH.INPUT.PASSWORD') }));
		}
		if (objectPath.get(f, 'form.controls.password.errors.minlength')) {
			this.errors.push(this.translate.instant('AUTH.VALIDATION.MIN_LENGTH', { name: this.translate.instant('AUTH.INPUT.PASSWORD') }));
		}

		if (this.errors.length > 0) {
			this.authNoticeService.setNotice(this.errors.join('<br/>'), 'error');
			this.spinner.active = false;
		}

		return false;
	}

	forgotPasswordPage(event: Event) {
		this.action = 'forgot-password';
		this.actionChange.next(this.action);
	}

	register(event: Event) {
		this.action = 'register';
		this.actionChange.next(this.action);
	}
}