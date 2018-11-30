import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AuthenService } from './../../../../app/areas/control-panel/services/authen.service';

@Injectable()
export class ControlPanelDataService {
    constructor(
        private http: HttpClient,
        public authenticationService: AuthenService,
    ) {
    }

    public getAuthentication(login: any, password: any): Observable<any> {
        return this.http.post(`${environment.apiRootUrl}/auth/token`, null,
            {
                responseType: 'text', headers: this.authenticationService.getAuthenticationHeaderBasic(login, password)
            });
    }
    public register(model: any): Observable<any> {
        return this.http.post(`${environment.apiRootUrl}/v1/users/register`, model
        // ,{ responseType: 'text', headers: this.authenticationService.getAuthenticationHeaderBasic(login, password)}
    );
    }
    //     public  getAuthentication(login, password): Observable<any> {
    //         const basic = btoa(`${login}:${password}`);
    //        // const data = new HttpHeaders().set('Authorization', `Basic ${basic}`);
    //         alert('dg');
    //        // const eventt = JSON.parse(basic);
    //         return this.http.post(`${environment.apiRootUrl}Auth/token`, {lala: 'lala'},
    //         { headers: new HttpHeaders().set('Authorization', `Basic ${basic}`)}
    //           .map(res => { console.log(res); try { return res.json(); } catch (err) { return res; } }));
    //     }
    // }
}
