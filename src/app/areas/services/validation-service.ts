import { Injectable, Inject, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DecimalPipe } from '@angular/common';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class ValidationService implements OnDestroy {
    private static http: any;
    // tslint:disable-next-line:max-line-length
    private static emailRegex = /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gm;

    private config = {};
    private langChangeSub: any;

    constructor(private httpClient: HttpClient,
        private translateService: TranslateService) {
        ValidationService.http = httpClient;
        this.loadMessages();

        translateService.onLangChange.subscribe(() => {
            this.loadMessages();
        });
    }

    ngOnDestroy() {
        if (this.langChangeSub) {
            this.langChangeSub.unsubscribe();
        }
    }

    private loadMessages() {
        this.translateService.get('validation').subscribe(res => {
            this.config = res;
        });
    }

    public getValidatorErrorMessage(control: any) {
        if (control && control !== null) {
            for (const propertyName in control.errors) {
                if (control.errors.hasOwnProperty(propertyName)) {
                    return this.config[propertyName];
                }
            }
        }

        return null;
    }

    public emailValidator(control) {
        if (!control.value || control.value === null) {
            return null;
        }

        if (control.value.match(ValidationService.emailRegex)) {
            return null;
        } else {
            return { 'invalidEmail': true };
        }
    }

    public confirmPasswordValidator(formGroup) {
        if (!formGroup.get('password').value || !formGroup.get('confirmPassword').value
            || formGroup.get('password').value === null || formGroup.get('confirmPassword').value === null) {
            return null;
        }

        if (formGroup.get('password').value === formGroup.get('confirmPassword').value) {
            return null;
        } else {
            return { 'passwordsDoNotMatch': true };
        }
    }

    public dateRangeValidator(formGroup) {
        if (!formGroup.get('lowerDateLimit').value || !formGroup.get('upperDateLimit').value
            || formGroup.get('lowerDateLimit').value === null || formGroup.get('upperDateLimit').value === null) {
            return null;
        }

        if (new Date(formGroup.get('lowerDateLimit').value) < new Date(formGroup.get('upperDateLimit').value)) {
            return null;
        } else {
            return { 'invalidLowerDateLimit': true };
        }
    }

    public ageRangeValidator(formGroup) {
        if (!formGroup.get('lowerAgeLimit').value || !formGroup.get('upperAgeLimit').value
            || formGroup.get('lowerAgeLimit').value === null || formGroup.get('upperAgeLimit').value === null) {
            return null;
        }

        if (new Date(formGroup.get('lowerAgeLimit').value) < new Date(formGroup.get('upperAgeLimit').value)) {
            return null;
        } else {
            return { 'invalidLowerAgeLimit': true };
        }
    }
}
