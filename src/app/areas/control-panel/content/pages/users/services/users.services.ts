import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenService } from '../../../../services/authen.service';
// import { GridRequest } from '../../../services/grid-request';
import { environment } from '../../../../../../../environments/environment';


@Injectable()
export class UserDataService {
    header = new HttpHeaders(
        {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        });
    constructor(private http: HttpClient,
        private authService: AuthenService
    ) {
    }

    public getUsers(): Observable<any> {
        return this.http.get(`${environment.apiRootUrl}/v1/Users/get`, { headers: this.header});
    }

    public getClients(): Observable<any> {
        return this.http.get(`${environment.apiRootUrl}/v1/Users/getUsersWithPets`, { headers: this.header});
    }

    public getUser(userId: any): Observable<any> {
        return this.http.get(`${environment.apiRootUrl}/v1/Users/get/${userId}`, { headers: this.authService.getAuthenticationHeader() });
    }

    // public createUser(model: any): Observable<any> {
    //     const header = new HttpHeaders(
    //         {
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    //         });
    //     return this.http.post(`${environment.apiRootUrl}v1/Users`, model
    //     , { headers: header });
    // }

    public registerUser(model: any): Observable<any> {
        return this.http.post(`${environment.apiRootUrl}/v1/Users/Register`, model, { headers: this.header });
    }

    public registerGrummer(model: any): Observable<any> {
        return this.http.post(`${environment.apiRootUrl}/v1/Users/RegisterGrummer`, model, { headers: this.header });
    }

    public registerClient(model: any): Observable<any> {
        return this.http.post(`${environment.apiRootUrl}/v1/Users/RegisterClient`, model, { headers: this.header });
    }


    public uploadPhotoUser(userId: any): Observable<any> {
        return this.http.post(`${environment.apiRootUrl}/v1/Users/UploadPhoto/${userId}`,
        { headers: this.authService.getAuthenticationHeader() });
    }

    public deleteUser(userId: any): Observable<any> {
        return this.http.delete(`${environment.apiRootUrl}/v1/Users/${userId}`,
        { headers: this.authService.getAuthenticationHeader() });
    }

    public updateUser(userId: any, model: any): Observable<any> {
        return this.http.put(`${environment.apiRootUrl}/v1/Users/${userId}`, model, { headers: this.header });
    }

    public changePasswordNew(userId: any, oldPassword: any, newPassword: any): Observable<any> {
        return this.http.put(`${environment.apiRootUrl}/v1/Users/ChangePassword/{id}/{oldPassword}/{newPassword}`, newPassword
            , { headers: this.authService.getAuthenticationHeader() });
    }

    public changePassword(id: any, password: any): Observable<any> {
        return this.http.put(`${environment.apiRootUrl}/v1/Users/ChangePassword/${id}/${password}`, id
            , { headers: this.authService.getAuthenticationHeader() });
    }

    public restorePassword(userId: any, hash: any, password: any): Observable<any> {
        return this.http.put(`${environment.apiRootUrl}/v1/Users/RestorePassword/{userId}/{hash}/{password}`, password
            , { headers: this.authService.getAuthenticationHeader() });
    }

    public sendForgotPasswordMessage(email: any): Observable<any> {
        return this.http.post(`${environment.apiRootUrl}/v1/Users/SendForgotPasswordMessage/${email}`
            , { headers: this.header });
    }


    // public getTechnologies(): Observable<any> {
    //     return this.http.get(`${environment.apiRootUrl}technology`
    //         , { headers: this.authService.getAuthenticationHeader() });
    // }

    // public getExperiences(): Observable<any> {
    //     return this.http.get(`${environment.apiRootUrl}enum/Experience`
    //         , { headers: this.authService.getAuthenticationHeader() });
    // }

    // public detachVacancy(formData: any): Observable<any> {
    //     return this.http.post(`${environment.apiRootUrl}vacancy/detachCandidate`, formData
    //         , { headers: this.authService.getAuthenticationHeader() });
    // }

    // public deleteCandidate(candidateId: any): Observable<any> {
    //     return this.http.delete(`${environment.apiRootUrl}candidate/` + candidateId);
    // }

    // public changeCandidateStatus(ids: number[], status: any): Observable<any> {
    //     let params = new HttpParams();

    //     params = params.set('status', status);

    //     return this.http.post(`${environment.apiRootUrl}candidate/changeStatus`, ids,
    //         { params: params });
    // }



    // public getCandidateByVacancyStage(vacancyId: number, stageId: number): Observable<any> {
    //     let params = new HttpParams();

    //     params = params.set('vacancyId', vacancyId.toString());
    //     params = params.set('stageId', stageId.toString());

    //     return this.http.get(`${environment.apiRootUrl}candidate/getByVacancyAndStage`,
    //         { params: params });
    // }

    // public attachCandidateStageToVacancy(formData: any): Observable<any> {
    //     return this.http.post(`${environment.apiRootUrl}vacancy/attachCandidate`, formData,
    //     );
    // }

    // public getByCandidate(candidateId: number): Observable<any> {
    //     let params = new HttpParams();

    //     params = params.set('candidateId', candidateId.toString());

    //     return this.http.get(`${environment.apiRootUrl}vacancy/getByCandidate`,
    //         { params: params });
    // }

    // public getVacancyByTechnologyAndExperience(experienceId: number, selectedTechnologies): Observable<any> {
    //     let params = new HttpParams();

    //     params = params.set('experience', experienceId.toString());

    //     return this.http.post(`${environment.apiRootUrl}vacancy/getByTechnologyAndExperience`,
    //         selectedTechnologies, { params: params });
    // }
}
