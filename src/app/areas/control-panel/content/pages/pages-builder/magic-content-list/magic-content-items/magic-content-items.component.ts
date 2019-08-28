import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PageBuilderDataService } from '../../services/pages-builder.services';
import { ValidationService } from '../../../../../../services/validation-service';
import { NotificationService } from '../../../../../services/notification.service';
import { NotificationType } from '../../../../../../../enums/notification-type';
import { MagicContentItem } from './magic-content-items';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../../../../../../core/auth/authentication.service';
import { Location } from '@angular/common';

@Component({
    templateUrl: './magic-content-items.component.html',
    styleUrls: ['./magic-content-items.component.scss']
})
export class MagicContentItemComponent implements OnInit, OnDestroy {

    public setStageModalVisible = false;
    private subscription: Subscription = new Subscription();
    subscriptions = [];
    public cheakVal = false;
    public submitted = false;


    private id = '';
    private type = 0;
    private title: string = '';
    private description: string = '';
    public content: string = '';
    public color: string = '';
    public css: string = '';
    public icon: string = '';
    public image: string = '';
    public addContentItem: string = '';
    public magicPageId: string = '';
    public sortNumder: number = 0;

    public magicContentItem: MagicContentItem = new MagicContentItem();

    public froalaOptions: Object = {
        charCounterCount: true,
        toolbarButtons: ['bold', 'italic', 'underline', '|', 'fontFamily', 'fontSize', '|', 'align', 'formatOL',
            'formatUL', '|', 'selectAll', 'clearFormatting', '|', 'undo', 'redo'],
        toolbarButtonsXS: ['bold', 'italic', 'underline', '|', 'fontFamily', 'fontSize', '|', 'align', '|', 'undo', 'redo'],
        toolbarButtonsSM: ['bold', 'italic', 'underline', '|', 'fontFamily', 'fontSize', '|', 'align', '|', 'undo', 'redo'],
        toolbarButtonsMD: ['bold', 'italic', 'underline', '|', 'fontFamily', 'fontSize', '|', 'align', '|', 'undo', 'redo'],
    };

    public MagicContentItemFrom: FormGroup = new FormGroup({
        'id': new FormControl(''),
        'title': new FormControl('', Validators.required),
        'description': new FormControl(''),
        'content': new FormControl(''),
        'color': new FormControl(''),
        'css': new FormControl(''),
        'icon': new FormControl(''),
        'image': new FormControl(''),
        'magicPageId': new FormControl(''),
        'sortNumder': new FormControl(''),

    });

    constructor(
        private authService: AuthenticationService,
        private pageBuilderDataService: PageBuilderDataService,
        private activeRoute: ActivatedRoute,
        public validationService: ValidationService,
        private router: Router,
        private notificationService: NotificationService,
        private location: Location,

    ) {

        this.subscription = activeRoute.params.subscribe(params => {
            this.id = params['id'];
        }); this.subscription = activeRoute.params.subscribe(params => {
            this.addContentItem = params['magicPageId'];
        });
    }

    ngOnInit() {
        if (this.id) {
            this.pageBuilderDataService.getMagicContentItem(this.id).subscribe(
                data => {
                    this.magicContentItem = data.result;
                    this.magicContentItem.title = data.Title;
                    this.magicContentItem.description = data.Description;
                    this.magicContentItem.content = data.Content;
                    this.magicContentItem.css = data.Css;
                    this.magicContentItem.icon = data.Icon;
                    this.magicContentItem.image = data.Image;
                    this.magicContentItem.color = data.Color;
                    this.magicContentItem.sortNumder = data.sortNumder;
                    this.magicContentItem.magicPageId = data.MagicPageId;
                    return this.setFormData(this.magicContentItem);
                });
        }
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    private setFormData(magicContentItem) {
        this.MagicContentItemFrom.setValue({
            'id': magicContentItem.Id,
            'title': magicContentItem.Title,
            'description': magicContentItem.Description,
            'content': magicContentItem.Content,
            'color': magicContentItem.Color,
            'css': magicContentItem.Css,
            'icon': magicContentItem.Icon,
            'image': magicContentItem.Image,
            'sortNumder': magicContentItem.SortNumder,
            'magicPageId': magicContentItem.MagicPageId,
        });
    }

    public saveMagicContentItemClick($event) {
        this.submitted = true;
        const formData = this.MagicContentItemFrom.value;
        if (!this.id) {
            if (!this.magicContentItem.title) {
                this.cheakVal = false;
            }
            if (!this.magicContentItem.description) {
                this.cheakVal = false;
            }
            if (!this.magicContentItem.content) {
                this.cheakVal = false;
            }
            if (!this.magicContentItem.color) {
                this.cheakVal = false;
            }

            if (!this.magicContentItem.icon) {
                this.cheakVal = false;
            }
            if (!this.magicContentItem.css) {
                this.cheakVal = false;
            }
            if (!this.magicContentItem.image) {
                this.cheakVal = false;
            }
            if (!this.magicContentItem.magicPageId) {
                this.cheakVal = true;
                this.magicContentItem.magicPageId = this.addContentItem;

                formData['id'] = 0;
                this.pageBuilderDataService.createMagicContentItem(this.magicContentItem).subscribe(
                    data => {
                        this.location.back();
                    },
                    error => {
                        if (error.status === 400) {
                            this.notificationService.notify(NotificationType.Error, 'createCandidateError');
                        }
                        if (error.status === 401) {
                            this.authService.logout(true);
                        }
                    });
            }
        } else {
            this.pageBuilderDataService.updateMagicContentItem(this.id, formData).subscribe(
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
        const formData = this.MagicContentItemFrom.value;
    }
}
