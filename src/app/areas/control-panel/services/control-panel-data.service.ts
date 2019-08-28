import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AuthenService } from './../../../../app/areas/control-panel/services/authen.service';

@Injectable({
    providedIn: 'root',
})
export class ControlPanelDataService {
    header = new HttpHeaders(
        {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json',
        });

    constructor(
        private http: HttpClient,
        public authService: AuthenService,
    ) {
    }

    public getAuthentication(login: any, password: any): Observable<any> {
        return this.http.post(`${environment.apiRootUrl}/auth/token`, null,
            {
                responseType: 'text', headers: this.authService.getAuthenticationHeaderBasic(login, password)
            });
    }
    public register(model: any): Observable<any> {
        return this.http.post(`${environment.apiRootUrl}/v1/users/register`, model);
    }

    public getUserInfo(): Observable<any> {
        return this.http.get(`${environment.apiRootUrl}/Auth/info`, { headers: this.header });
    }













    //     public  getAuthentication(login, password): Observable<any> {
    //         const basic = btoa(`${login}:${password}`);
    //        // const data = new HttpHeaders().set('Authorization', `Basic ${basic}`);
    //        // const eventt = JSON.parse(basic);
    //         return this.http.post(`${environment.apiRootUrl}Auth/token`, {lala: 'lala'},
    //         { headers: new HttpHeaders().set('Authorization', `Basic ${basic}`)}
    //           .map(res => { console.log(res); try { return res.json(); } catch (err) { return res; } }));
    //     }
    // }
}
