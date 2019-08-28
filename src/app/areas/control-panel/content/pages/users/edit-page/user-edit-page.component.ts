import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserDataService } from '../services/users.services';
import { ValidationService } from '../../../../../services/validation-service';
import { NotificationService } from '../../../../services/notification.service';
import { NotificationType } from '../../../../../../enums/notification-type';
import { UserModel } from './user';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationService } from '../../../../../../core/auth/authentication.service';
import { debounce } from 'rxjs/internal/operators/debounce';
// import { environmenturl } from '../../../../../../../environments/environment';

@Component({
    templateUrl: './user-edit-page.component.html',
    styleUrls: ['./user-edit-page.component.scss']
})
export class UserEditPageComponent implements OnInit, OnDestroy {
    public clientSide = false;
    public userSide = false;
    public setStageModalVisible = false;

    // private id = 0;
    private subscription: Subscription = new Subscription();
    private experienceId = 0;
    private technologyIds: any[] = [];
    //   private experienceEnumName = EnumNames.EXPERIENCE;
    //   private stageEnumName = EnumNames.VACANCYSTAGE;
    public experiences: any[] = [];
    public technologies: any[] = [];
    public vacancyStages: any[] = [];
    public vacancies: any[] = [];
    public candidateVacancyStage: any[] = [];
    public vacanciesOfCadidate: any[] = [];
    public vacanciesForTheChoice: any[] = [];
    public selectedVacanciesOfCandidate: any[] = [];
    public candidateVacancy: any[] = [];
    public cheakVal = false;
    public submitted = false;

    public id = 0;
    // private subscription: Subscription = new Subscription();
    private firstname: string = '';
    private secondname: string = '';
    public email: string = '';
    public phone: string = '';
    public role: number;
    public note: string;
    public birthday: string;
    public street: string;
    public user: UserModel = new UserModel();

    public froalaOptions: Object = {
        charCounterCount: true,
        toolbarButtons: ['bold', 'italic', 'underline', '|', 'fontFamily', 'fontSize', '|', 'align', 'formatOL',
            'formatUL', '|', 'selectAll', 'clearFormatting', '|', 'undo', 'redo'],
        toolbarButtonsXS: ['bold', 'italic', 'underline', '|', 'fontFamily', 'fontSize', '|', 'align', '|', 'undo', 'redo'],
        toolbarButtonsSM: ['bold', 'italic', 'underline', '|', 'fontFamily', 'fontSize', '|', 'align', '|', 'undo', 'redo'],
        toolbarButtonsMD: ['bold', 'italic', 'underline', '|', 'fontFamily', 'fontSize', '|', 'align', '|', 'undo', 'redo'],
    };

    public userFrom: FormGroup = new FormGroup({
        'id': new FormControl(''),
        'firstname': new FormControl('', Validators.required),
        'secondname': new FormControl('', Validators.required),
        'email': new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z_]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}')]),
        'phone': new FormControl('', Validators.required),
        'role': new FormControl('', Validators.required),
        'note': new FormControl(''),
        'birthday': new FormControl(''),
        'street': new FormControl(''),
        'passwordHash': new FormControl('', Validators.required),
    });

    constructor(private userDataService: UserDataService,
        private authService: AuthenticationService,
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
        if (this.id) {
            this.userDataService.getUser(this.id).subscribe(
                result => {
                    if (result) {
                        let user = result.result;
                        this.setFormData(user);
                    }
                },
                error => {
                    if (error.status === 400) {
                        this.notificationService.notify(NotificationType.Error, 'candidateDetailsLoadError');
                    }
                    if (error.status === 401) {
                        this.authService.logout(true);
                    }
                });
        }
        if (window.location.href === `http://charliegroom.com.ua/ControlPanel/Clients/newUser`) {
            this.clientSide = true;
            this.userSide = false;
        }
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    private setFormData(user) {
        this.userFrom.setValue({
            'id': user.Id,
            'firstname': user.Firstname,
            'secondname': user.Secondname,
            'email': user.Email,
            'phone': user.Phone,
            'role': user.Role,
            'passwordHash': user.Role,
            'street': user.Street,
            'birthday': user.Birthday,
            'note': user.Note,
        });
    }

    public saveUserClick($event) {
        this.submitted = true;
        const formData = this.userFrom.value;
        if (!this.id) {
            if (!this.user.firstname) {
                this.cheakVal = false;
            }
            if (!this.user.email) {
                this.cheakVal = false;
            }
            if (!this.user.phone) {
                this.cheakVal = false;
            }
            if (!this.user.secondname) {
                this.user.secondname = '-';
            }
            if (!this.user.birthday) {
                this.user.birthday = '-';
            }
            if (!this.user.street) {
                this.user.street = '-';
            }
            if (!this.user.note) {
                this.user.note = '-';
            }

            if (this.clientSide) {
                if (!this.user.passwordHash) {
                    this.user.passwordHash = null;
                }
            }
            if (this.userSide) {
                if (!this.user.passwordHash) {
                    this.user.passwordHash = 'password';
                }
            } else {
                this.cheakVal = true;
                formData['id'] = 0;
                if (window.location.href ===   `http://charliegroom.com.ua/ControlPanel/Clients/newUser`) {
                    this.user.role = 4;
                    this.userDataService.registerClient(this.user).subscribe(
                        data => {
                            this.location.back();

                        },
                        error => {
                            if (error.status === 400) {
                                alert('error');
                                this.notificationService.notify(NotificationType.Error, 'createCandidateError');
                            }
                            if (error.status === 401) {
                                this.authService.logout(true);
                            }
                        });
                }
                if (window.location.href ===  `http://charliegroom.com.ua/ControlPanel/Grummers/newUser`) {
                    this.user.role = 3;
                    this.userDataService.registerGrummer(this.user).subscribe(
                        data => {
                            this.location.back();

                        },
                        error => {
                            if (error.status === 400) {
                                alert('error');
                                this.notificationService.notify(NotificationType.Error, 'createCandidateError');
                            }
                            if (error.status === 401) {
                                this.authService.logout(true);
                            }
                        });
                } else {
                    // this.userSide = true;
                    this.userDataService.registerUser(this.user).subscribe(
                        data => {
                            this.location.back();
                        },
                        error => {
                            if (error.status === 400) {
                                alert('error');
                                this.notificationService.notify(NotificationType.Error, 'createCandidateError');
                            }
                            if (error.status === 401) {
                                this.authService.logout(true);
                            }
                        });
                }

            }
        } else {
            this.userDataService.updateUser(this.id, this.user).subscribe(
                data => {
                    if (this.user.role === 4) {
                        this.location.back();
                    } else {
                        this.location.back();
                    }
                },
                error => {
                    if (error.status === 400) {
                        this.notificationService.notify(NotificationType.Error, 'candidateChangeStatusError');
                    }
                    if (error.status === 401) {
                        this.authService.logout(true);
                    }
                });
        }
    }

    public cancelClick(event) {
        this.location.back();
    }

    public showModal(event) {
        this.setStageModalVisible = true;
        const formData = this.userFrom.value;
        this.vacancies = [];
        this.userDataService.updateUser(this.id, formData).subscribe(
            data => {
            },
            error => {
                if (error.status === 400) {
                    this.notificationService.notify(NotificationType.Error, 'candidateChangeStatusError');
                }
                if (error.status === 401) {
                    this.authService.logout(true);
                }
            });
    }
}
