import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PetsDataService } from '../services/pets.services';
import { ValidationService } from '../../../../../services/validation-service';
import { NotificationService } from '../../../../services/notification.service';
import { NotificationType } from '../../../../../../enums/notification-type';
import { Pet } from './pet';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../../../../../core/auth/authentication.service';
import { UserDataService } from '../../users/services/users.services';
import { Location } from '@angular/common';
// import { environmenturl } from '../../../../../../../environments/environment';

@Component({
    templateUrl: './pet-page.component.html',
    styleUrls: ['./pet-page.component.scss']
})
export class PetComponent implements OnInit, OnDestroy {

    public setStageModalVisible = false;
    private subscription: Subscription = new Subscription();
    public cheakVal = false;
    public submitted = false;

    public name: string = '';
    public breed: string = '';
    public birthday: string = '';
    public note: string = '';
    public image: string = '';
    public ownerUserId: string = '';

    private id;
    public petModel: Pet = new Pet();

    public PetFrom: FormGroup = new FormGroup({
        'id': new FormControl(''),
        'name': new FormControl(''),
        'breed': new FormControl(''),
        'birthday': new FormControl(''),
        'note': new FormControl(''),
        'image': new FormControl(''),
        'ownerUserId': new FormControl(''),
        'ownerName': new FormControl(''),
    });

    constructor(
        private authService: AuthenticationService,
        private petsDataService: PetsDataService,
        private activeRoute: ActivatedRoute,
        public validationService: ValidationService,
        private router: Router,
        private notificationService: NotificationService,
        private userDataService: UserDataService,
        private location: Location
    ) {

        this.subscription = activeRoute.params.subscribe(params => {
            this.id = params['id'];
        });
    }

    ngOnInit() {
        if (window.location.href === `http://charliegroom.com.ua/ControlPanel/Pets/newPet/${this.id}`) {
            this.userDataService.getUser(this.id).subscribe(
                result => {
                    const petModel = result.result;
                    this.petModel.ownerName = (petModel.Firstname + ' ' + petModel.Secondname);
                },
                error => {
                    if (error.status === 400) {
                        this.notificationService.notify(NotificationType.Error, 'candidateChangeStatusError');
                    }
                    if (error.status === 401) {
                        this.authService.logout(true);
                    }
                });
            this.petModel.name = '-';
            this.petModel.breed = '-';
            this.petModel.birthday = '01/01/2019';
            this.petModel.note = '-';
            this.petModel.image = '-';
            this.petModel.ownerUserId = this.id;
        } else if (this.id) {
            this.petsDataService.getForOwner().subscribe(
                result => {
                    const petModel = result.result.find(item => item.Id === this.id);
                    return this.setFormData(petModel);
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

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    private setFormData(petModel) {
        this.PetFrom.setValue({
            'id': petModel.Id,
            'name': petModel.Name,
            'breed': petModel.Breed,
            'birthday': petModel.Birthday,
            'note': petModel.Note,
            'image': petModel.Image,
            'ownerUserId': petModel.OwnerUserId,
            'ownerName': petModel.OwnerName,
        });
    }

    public savePetClick($event) {
        this.submitted = true;
        const formData = this.PetFrom.value;
        if (window.location.href === `http://charliegroom.com.ua/ControlPanel/Pets/newPet/${this.id}`) {
            if (!this.petModel.name) {
                this.petModel.name = '';
            }
            if (!this.petModel.breed) {
                this.petModel.breed = '';
            }
            if (!this.petModel.birthday) {
                this.petModel.birthday = '-';
            }
            if (!this.petModel.note) {
                this.petModel.note = '-';
            }
            if (!this.petModel.image) {
                this.petModel.image = '-';
            }
            if (!this.petModel.ownerUserId) {
                this.petModel.ownerUserId = null;
            }
            if (!this.petModel.ownerName) {
                this.petModel.ownerName = '-';
            } else {
                this.cheakVal = true;
                formData['id'] = 0;
                this.petsDataService.createPet(this.petModel).subscribe(
                    data => {
                        this.location.back();
                    },
                    error => {
                        if (error.status === 400) {
                            this.authService.logout(true);
                        }
                        if (error.status === 401) {
                            this.authService.logout(true);
                        }
                    });
            }
        } else {
            this.petsDataService.updatePet(this.id, formData).subscribe(
                data => {
                    this.location.back();
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
        const formData = this.PetFrom.value;
    }
}
