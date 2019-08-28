import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// import { AuthService } from '../services/auth.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class EnumDataService {
    constructor(private http: HttpClient,
        // private authService: AuthService
    ) { }

    public getEnums(): Observable<any> {
        return this.http.get(`${environment.apiRootUrl}/v1/Enums`);
    }
}
