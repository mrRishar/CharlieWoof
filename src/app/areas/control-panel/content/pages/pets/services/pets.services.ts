import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { AuthenService } from '../../../../services/authen.service';
// import { GridRequest } from '../../../services/grid-request';
import { environment } from '../../../../../../../environments/environment';
import { filter, map, flatMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable()
export class PetsDataService {
    header = new HttpHeaders(
        {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        });
    constructor(private http: HttpClient,
        private authService: AuthenService
    ) {
    }

    public getPets(): Observable<any> {
        return this.http.get(`${environment.apiRootUrl}/v1/Pets/`, { headers: this.header });
    }

    public getPetByOwner(ownerId: any): Observable<any> {
        return this.http.get(`${environment.apiRootUrl}/v1/Pets/${ownerId}`, { headers: this.header });
    }

    public getForOwner(): Observable<any> {
        return this.http.get(`${environment.apiRootUrl}/v1/Pets/petsOwner`, { headers: this.header });
    }

    public updatePet(Id: any, model: any): Observable<any> {
        return this.http.put(`${environment.apiRootUrl}/v1/Pets/${Id}`, model, { headers: this.header });
    }

    public deletePet(id: any): Observable<any> {
        return this.http.delete(`${environment.apiRootUrl}/v1/Pets/${id}`, { headers: this.header });
    }

    public createPet(model: any): Observable<any> {
        return this.http.post(`${environment.apiRootUrl}/v1/Pets`, model, { headers: this.header });
    }
}
