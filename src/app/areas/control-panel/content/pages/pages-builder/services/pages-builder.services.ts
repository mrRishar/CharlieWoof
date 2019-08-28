import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { AuthenService } from '../../../../services/authen.service';
// import { GridRequest } from '../../../services/grid-request';
import { environment } from '../../../../../../../environments/environment';
import { MagicPage } from '../edit-page/magicPage';
import { filter, map, flatMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable()
export class PageBuilderDataService {
    header = new HttpHeaders(
        {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        });
    constructor(private http: HttpClient,
        private authService: AuthenService
    ) {
    }

    public getSections(): Observable<any> {
        return this.http.get(`${environment.apiRootUrl}/v1/MagicPages/`);
    }

    public getSectionsWithContentItems(): Observable<any> {
        return this.http.get(`${environment.apiRootUrl}/v1/MagicPages/getWithContentItems`);
    }

    // public getSection(sectionId: any): Observable<any> {
    //     let id = sectionId;
    //     return this.http.get<any>(`${environment.apiRootUrl}v1/MagicPages/`
    //         , { headers: this.authService.getAuthenticationHeader() }).pipe(
    //             map(result => {
    //             // let list = data["result"];
    //             // data.valueOf;
    //             // data.toString();
    //             let Description = "rrr";
    //             // //return list.map(x => x.Description === Description);
    //             //  return list.filter(x => x.id === sectionId);
    //             result.map(one => one.Id === sectionId)
    //             ({ name })
    //         }));
    // }

    public updateSection(Id: any, model: any): Observable<any> {
        return this.http.put(`${environment.apiRootUrl}/v1/MagicPages/${Id}`, model, { headers: this.header });
    }

    public deleteSection(id: any): Observable<any> {
        return this.http.delete(`${environment.apiRootUrl}/v1/MagicPages/${id}`, { headers: this.header });
    }

    public createSection(model: any): Observable<any> {
        return this.http.post(`${environment.apiRootUrl}/v1/MagicPages`, model, { headers: this.header });
    }

    public getMagicContentList(magicPageId: any): Observable<any> {
        return this.http.get(`${environment.apiRootUrl}/v1/MagicContentItems/${magicPageId}`);
    }

    // public getMagicContentLists(): Observable<any> {
    //     return this.http.get(`${environment.apiRootUrl}v1/MagicContentItems`, { headers: this.authService.getAuthenticationHeader() });
    // }

    public getMagicContentItem(id: any): Observable<any> {
        return this.http.get(`${environment.apiRootUrl}/v1/MagicContentItems/get/${id}`);
    }


    public updateMagicContentItem(Id: any, model: any): Observable<any> {
        return this.http.put(`${environment.apiRootUrl}/v1/MagicContentItems/${Id}`, model, { headers: this.header });
    }

    public deleteMagicContentItem(id: any): Observable<any> {
        return this.http.delete(`${environment.apiRootUrl}/v1/MagicContentItems/${id}`, { headers: this.header });
    }

    public createMagicContentItem(model: any): Observable<any> {
        return this.http.post(`${environment.apiRootUrl}/v1/MagicContentItems`, model, { headers: this.header });
    }
}
