import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserDataService } from '../services/users.services';
import { ValidationService } from '../../../../../services/validation-service';
import { NotificationService } from '../../../../services/notification.service';
import { NotificationType } from '../../../../../../enums/notification-type';
import { UserModel } from './../edit-page/user';
import { Location } from '@angular/common';
// import { EnumDataService } from '../../../../services/enum.data.service';
// import { EnumNames } from '../../../../constants/enum-names';
// import { VacanciesDataService } from '../../../vacancies/services/vacancies-data.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationService } from '../../../../../../core/auth/authentication.service';
// import 'rxjs/add/observable/forkJoin';

@Component({
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {

    public submitted = false;
    public erorr = false;
    public setStageModalVisible = false;
    private subscription: Subscription = new Subscription();

    private id = 0;
    public secondPassword: string = '';
    public newPassword: string = '';

    constructor(
        private authService: AuthenticationService,
        private userDataService: UserDataService,
        private activeRoute: ActivatedRoute,
        public validationService: ValidationService,
        private router: Router,
        private notificationService: NotificationService,
        private location: Location,
    ) {

        this.subscription = activeRoute.params.subscribe(params => {
            this.id = params['id'];
        });
    }

    ngOnInit() {

    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    public saveUserClick($event) {
        this.submitted = true;
        if (this.id) {
            if (this.newPassword === this.secondPassword) {
                this.userDataService.changePassword(this.id, this.newPassword).subscribe(
                    result => {
                        this.location.back();
                    },
                    error => {
                        if (error.status === 400) {
                            this.notificationService.notify(NotificationType.Error, 'candidateDetailsLoadError');
                        }
                        if (error.status === 401) {
                            this.authService.logout(true);
                        }
                    });
            } else {
                this.erorr = true;
            }
        }
    }


    public cancelClick(event) {
        this.location.back();
    }
}
