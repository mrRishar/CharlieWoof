import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { SendedEmail } from '../content/pages/components/appointment-section/sended-email';
import { ContactUs } from '../content/pages/components/contact-section/contactUs';
// import { AuthService } from '../../../services/auth.service';
// import { GridRequest } from '../../../services/grid-request';

@Injectable()
export class IndexDataService {
    constructor(private http: HttpClient) {
    }

    public sendDataForm(sendedEmail: any): Observable<any> {
        // let params = new HttpParams();
        // params = params.set('sendedEmail', sendedEmail.toString());
        // let params2 = new HttpParams();
        // params2 = params2.set('email', email.toString());
        // let params3 = new HttpParams();
        // params3 = params3.set('date', name.toString());
        // let params4 = new HttpParams();
        // params4 = params4.set('startTime', name.toString());
        // let params5 = new HttpParams();
        // params5 = params5.set('endTime', name.toString());
        // let params6 = new HttpParams();
        // params6 = params6.set('breed', name.toString());
        // let params7 = new HttpParams();
        // params7 = params7.set('services', name.toString());
        // let params8 = new HttpParams();
        // params8 = params8.set('message', name.toString());
        // const body = {name: sendedEmail.name, email: sendedEmail.email};
        return this.http.post(`${environment.apiRootUrl}/v1/notifications`, sendedEmail);
        // {params, params2, params3 , params4, params5, params6, params7, params8});
        // , { headers: this.authService.getAuthenticationHeader() });
    }

    public sendContactForm(contactUs: any): Observable<any> {
        return this.http.post(`${environment.apiRootUrl}/v1/notifications/contact`, contactUs);
    }

    public sendContactFormForCours(addToCourses: any): Observable<any> {
        return this.http.post(`${environment.apiRootUrl}/v1/notifications/addToCourses`, addToCourses);
    }
}
