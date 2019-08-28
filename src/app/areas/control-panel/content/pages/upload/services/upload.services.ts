import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenService } from '../../../../services/authen.service';
import { environment } from '../../../../../../../environments/environment';
import { map } from 'rxjs/internal/operators/map';


@Injectable()
export class UploadDataService {
    header = new HttpHeaders(
        {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        });

    constructor(private http: HttpClient,
        private authService: AuthenService
    ) {
    }

    public getFilesOnly(): Observable<any> {
        return this.http.get(`${environment.apiRootUrl}/v1/MagicFiles/getFiles`).pipe(
            map(result => {
                const list = result['result'];
                const emagicFileType = 1;
                return list.filter(one => one.EmagicFileType === emagicFileType);
            }));
    }

    public getFiles(): Observable<any> {
        return this.http.get(`${environment.apiRootUrl}/v1/MagicFiles/getFiles`, { headers: this.header });
    }

    public getImages(): Observable<any> {
        return this.http.get(`${environment.apiRootUrl}/v1/MagicFiles/getImages`, { headers: this.header });
    }

    public deleteFile(id: any): Observable<any> {
        return this.http.delete(`${environment.apiRootUrl}/v1/MagicFiles/${id}`, { headers: this.header });
    }

    public uploadPhotoUser(name: any, file: any, type: any): Observable<any> {
        return this.http.post(`${environment.apiRootUrl}/v1/MagicFiles/${name}/${type}`, file, {
            reportProgress: true, observe: 'events',
            headers: this.header
        });
    }
}
