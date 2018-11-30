import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';
// import { NotificationType } from '../enums/notification-type';
import { Observable } from 'rxjs';
// import { AuthModel } from './auth-model';


import { environment } from '../../../../environments/environment';

@Injectable()
export class AuthenService {
    // authModel: AuthModel;
    // public login: string;
    // public password: string;
    // public basic = btoa(`${this.authModel.login}:${this.authModel.password}`);

    constructor(private http: HttpClient,
        private router: Router,
         private notificationService: NotificationService
    ) { }


    public isAuthenticated() {

        const accessToken = localStorage.getItem('accessToken');

        return accessToken !== 'undefined' && accessToken !== undefined && accessToken !== null;
    }

    public signIn(loginData: any): Observable<any> {
        return this.http.post(`${environment.apiRootUrl}user/login`, loginData);
    }

    public signOut() {
        localStorage.removeItem('accessToken');

        this.router.navigate(['signin']);
    }

    public getAuthenticationHeader() {
        return new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('accessToken')}`);
    }

    public getAuthenticationHeaderBasic(login, password) {
        const basic = btoa(`${login}:${password}`);
        return new HttpHeaders().set('Authorization', `Basic ${basic}`);
    }

    public signUp(userData: any, signUpErrorCallback: any) {
        this.http.post(`${environment.apiRootUrl}user/register`, userData).subscribe(
            data => {
                this.router.navigate(['emailverification'], { queryParams: { email: userData.email } });
            },
            error => {
                if (error.error.identityErrors && error.error.identityErrors.length && signUpErrorCallback) {
                    signUpErrorCallback(error.error.identityErrors);
                }
            });
    }

    public confirmEmail(email: any, token: any) {
        let params = new HttpParams();

        params = params.set('email', email);
        params = params.set('token', encodeURIComponent(token));

        return this.http.get(`${environment.apiRootUrl}user/confirm-email`, { params: params });
    }
}
