import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OrderService } from '../services/order.services';
import { ValidationService } from '../../../../../services/validation-service';
import { NotificationService } from '../../../../services/notification.service';
import { NotificationType } from '../../../../../../enums/notification-type';
import { Order } from './order';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../../../../../core/auth/authentication.service';
import { UserDataService } from '../../users/services/users.services';
import { Location } from '@angular/common';
import { PetsDataService } from '../../pets/services/pets.services';
import { OrderModel } from './order.1';
// import { environmenturl } from '../../../../../../../environments/environment';
import { AuthenService } from '../../../../services/authen.service';

@Component({
    templateUrl: './order-page.component.html',
    styleUrls: ['./order-page.component.scss']
})
export class OrderPageComponent implements OnInit, OnDestroy {

    public setStageModalVisible = false;
    private subscription: Subscription = new Subscription();
    public cheakVal = false;
    public submitted = false;

    private id = '';
    public note: string = '';
    public price: string = '';
    public clientName: string = '';
    public date: string = '';
    public petId: string = '';
    public grummerUserId: string = '';
    public value: string = '';
    public grummerName: string = '';
    public petName: string = '';
    public userId: string = '';
    public curentStatus: any = [];
    public curentService: any = [];

    public clientData: any = [];
    public pets: any = [];
    public grummers: any = [];
    public statuses: any = [
        { id: 1, name: 'Новий' },
        { id: 2, name: 'В очікуванні' },
        { id: 3, name: 'Закінчений' },
        { id: 4, name: 'Відмінений' }];
    public servicesList: any = [
        { id: 1, name: 'Тримінг' },
        { id: 2, name: 'Котики' },
        { id: 3, name: 'Комплексна стрижка' },
        { id: 4, name: 'Транфсер тварин' },
        { id: 5, name: 'Купання' },
        { id: 6, name: 'Додаткові послуги' }];
    public selectedValue: any;

    order: Order = new Order();
    orderModel: OrderModel = new OrderModel();

    public orderFrom: FormGroup = new FormGroup({
        services: new FormControl(),
        id: new FormControl(''),
        status: new FormControl(''),
        note: new FormControl(''),
        price: new FormControl(''),
        date: new FormControl(''),
        petId: new FormControl(''),
        grummerUserId: new FormControl(''),
        grummerName: new FormControl(''),
        userId: new FormControl(''),
        userName: new FormControl(''),
        petName: new FormControl(''),
        userPhone: new FormControl(''),
    });

    constructor(
        private authService: AuthenticationService,
        private orderService: OrderService,
        private activeRoute: ActivatedRoute,
        public validationService: ValidationService,
        private router: Router,
        private notificationService: NotificationService,
        private userDataService: UserDataService,
        private location: Location,
        private petsDataService: PetsDataService,
        private authenService: AuthenService,
    ) {
        this.subscription = activeRoute.params.subscribe(params => {
            this.id = params['id'];
        });
    }

    ngOnInit() {
        if (window.location.href === `http://charliegroom.com.ua/ControlPanel/Orders/newOrder/${this.id}`) {

            this.userDataService.getUser(this.id).subscribe(
                result => {
                    this.clientData = result.result;
                    this.order.userName = (this.clientData.Firstname + ' ' + this.clientData.Secondname);
                    this.order.grummerName = this.clientData.GrummerName;
                },
                error => {
                    if (error.status === 400) {
                        this.notificationService.notify(NotificationType.Error, 'candidateChangeStatusError');
                    }
                    if (error.status === 401) {
                        this.authService.logout(true);
                    }
                });
            this.getPets(this.id);
            this.getGrummers();
            this.order.petName = '-';
            this.order.date = '';
            this.order.note = '-';
            this.order.petId = null;
            this.order.price = '';
            this.getStatus('1');
            this.getService('6');
        } else {
            this.orderService.getOrdersWithName().subscribe(
                result => {
                    this.order = result.result.find(item => item.Id === this.id);
                    this.selectedValue = result.result.find(item => item.Id === this.id);
                    this.userId = this.selectedValue.UserId;
                    this.getPets(this.userId);
                    this.getStatus(this.selectedValue.Status);
                    this.getService(this.selectedValue.Services);
                    return this.setFormData(this.order);
                },
                error => {
                    if (error.status === 400) {
                        this.notificationService.notify(NotificationType.Error, 'candidateChangeStatusError');
                    }
                    if (error.status === 401) {
                        this.authService.logout(true);
                    }
                });
            this.getGrummers();
        }
    }

    public getService(n) {
        this.curentService = this.servicesList.find(x => x.id === n);
        return this.curentService.name;
    }

    public ChangingValueService(value) {
        this.value = value.target.value;
        this.order.services = this.value;
    }

    public getStatus(n) {
        this.curentStatus = this.statuses.find(x => x.id === n);
        return this.curentStatus.name;
    }

    public ChangingValueStatus(value) {
        this.value = value.target.value;
        this.order.status = this.value;
    }

    public ChangingValue(value) {
        this.value = value.target.value;
        this.order.grummerUserId = this.value;
    }

    public ChangingValuePet(value) {
        this.value = value.target.value;
        this.order.petId = this.value;
    }

    public getGrummers() {
        this.userDataService.getUsers().subscribe(
            result => {
                this.grummers = result.result.filter(x => x.Role === 3);
                this.order.grummerUserId = this.grummers.Id;
                this.order.grummerName = this.grummers.Name;
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

    public getPets(ownerId) {
        this.petsDataService.getForOwner().subscribe(
            data => {
                this.pets = data.result.filter(item => item.OwnerUserId === ownerId);
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

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    private setFormData(order) {
        this.orderFrom.setValue({
            'note': order.Note,
            'id': order.Id,
            'date': order.Date,
            'price': order.Price,
            'status': order.Status,
            'services': order.Services,
            'petId': order.PetId,
            'grummerUserId': order.GrummerUserId,
            'userId': order.UserId,
            'petName': order.PetName,
            'userName': order.UserName,
            'grummerName': order.GrummerName,
            'userPhone': order.UserPhone,
        });
    }

    public saveMagicPageClick($event) {
        this.submitted = true;
        const formData = this.orderFrom.value;
        if (window.location.href === `http://charliegroom.com.ua/ControlPanel/Orders/newOrder/${this.id}`) {
            if (!this.order.petId) {
                this.order.petId = null;
            }
            if (!this.order.grummerUserId) {
                this.order.grummerUserId = this.value;
            }
            if (!this.order.grummerName) {
                this.order.grummerName = '-';
            }
            if (!this.order.services) {
                this.cheakVal = false;
            }
            if (!this.order.status) {
                this.order.status = '1';
            }
            if (!this.order.date) {
                this.order.date = '12/12/2019';
            }
            if (!this.order.note) {
                this.order.note = '';
            }
            if (!this.order.price) {
                this.order.price = '0';
            }
            this.orderModel.date = this.order.date;
            this.orderModel.grummerUserId = this.order.grummerUserId;
            this.orderModel.note = this.order.note;
            this.orderModel.petId = this.order.petId;
            this.orderModel.price = this.order.price;
            this.orderModel.services = this.order.services;
            this.orderModel.status = this.order.status;
            this.orderModel.userId = this.id;

            this.order.userId = this.id;
            this.cheakVal = true;
            formData['id'] = 0;
            formData.userId = this.id;
            this.orderService.createOrder(this.order).subscribe(
                data => {
                    this.location.back();
                },
                error => {
                    if (error.status === 400) {
                    }
                    if (error.status === 401) {
                        this.authService.logout(true);
                    }
                });
        } else if (window.location.href === `http://charliegroom.com.ua/ControlPanel/Orders/edit/${this.id}`) {
            if (!this.order.grummerUserId) {
                this.order.grummerUserId = this.selectedValue.GrummerUserId;
            }
            this.orderService.updateOrder(this.id, this.order).subscribe(
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
        const formData = this.orderFrom.value;
    }
}
