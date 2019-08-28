import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PageBuilderDataService } from '../services/pages-builder.services';
import { NotificationService } from '../../../../services/notification.service';
import { NotificationType } from '../../../../../../enums/notification-type';
import { MagicPage } from './magicPage';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../../../../../core/auth/authentication.service';
import { Location } from '@angular/common';

@Component({
    templateUrl: './section-page.component.html',
    styleUrls: ['./section-page.component.scss']
})
export class SectionPageComponent implements OnInit, OnDestroy {

    public setStageModalVisible = false;
    private subscription: Subscription = new Subscription();
    public vacancies: any[] = [];
    public cheakVal = false;
    public submitted = false;

    private id = 0;
    private type = 0;
    private title: string = '';
    private description: string = '';
    public content: string = '';
    public seoTitle: string = '';
    public seoDescription: string = '';
    public seoKeywords: string = '';
    magicPage: MagicPage = new MagicPage();

    public froalaOptions: Object = {
        charCounterCount: true,
        toolbarButtons: ['bold', 'italic', 'underline', '|', 'fontFamily', 'fontSize', '|', 'align', 'formatOL',
            'formatUL', '|', 'selectAll', 'clearFormatting', '|', 'undo', 'redo'],
        toolbarButtonsXS: ['bold', 'italic', 'underline', '|', 'fontFamily', 'fontSize', '|', 'align', '|', 'undo', 'redo'],
        toolbarButtonsSM: ['bold', 'italic', 'underline', '|', 'fontFamily', 'fontSize', '|', 'align', '|', 'undo', 'redo'],
        toolbarButtonsMD: ['bold', 'italic', 'underline', '|', 'fontFamily', 'fontSize', '|', 'align', '|', 'undo', 'redo'],
    };

    public magicPageFrom: FormGroup = new FormGroup({
        'type': new FormControl(),
        'id': new FormControl(''),
        'title': new FormControl('', Validators.required),
        'description': new FormControl(''),
        'content': new FormControl(''),
        'seoTitle': new FormControl(''),
        'seoDescription': new FormControl(''),
        'seoKeywords': new FormControl(''),
    });

    constructor(
        private authService: AuthenticationService,
        private pageBuilderDataService: PageBuilderDataService,
        private activeRoute: ActivatedRoute,
        private notificationService: NotificationService,
        private location: Location,
    ) {

        this.subscription = activeRoute.params.subscribe(params => {
            this.id = params['id'];
        });
    }

    ngOnInit() {
        if (this.id) {
            this.pageBuilderDataService.getSections().pipe(map(result => {
                this.magicPage = result.result.find(item => item.Id === this.id);
                return this.setFormData(this.magicPage);
            })).subscribe();
        }
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    private setFormData(magicPage) {
        this.magicPageFrom.setValue({
            'type': magicPage.Type,
            'id': magicPage.Id,
            'title': magicPage.Title,
            'description': magicPage.Description,
            'content': magicPage.Content,
            'seoTitle': magicPage.SeoTitle,
            'seoDescription': magicPage.SeoDescription,
            'seoKeywords': magicPage.SeoKeywords,
        });
    }

    public saveMagicPageClick($event) {
        this.submitted = true;
        const formData = this.magicPageFrom.value;
        if (!this.id) {
            if (!this.magicPage.title) {
                this.cheakVal = false;
            }
            if (!this.magicPage.type) {
                this.magicPage.type = 87;
            }
            if (!this.magicPage.description) {
                this.cheakVal = false;
            }
            if (!this.magicPage.content) {
                this.cheakVal = false;
            }
            if (!this.magicPage.seoTitle) {
                this.cheakVal = false;
            }
            if (!this.magicPage.seoDescription) {
                this.cheakVal = false;
            }
            if (!this.magicPage.seoKeywords) {
                this.cheakVal = false;
            } else {
                this.cheakVal = true;
                formData['id'] = 0;
                this.pageBuilderDataService.createSection(this.magicPage).subscribe(
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
            this.pageBuilderDataService.updateSection(this.id, formData).subscribe(
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
        const formData = this.magicPageFrom.value;
        this.vacancies = [];
    }
}
