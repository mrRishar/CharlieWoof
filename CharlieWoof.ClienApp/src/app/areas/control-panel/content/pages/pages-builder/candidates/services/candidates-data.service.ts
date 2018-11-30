import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

// import { AuthService } from '../../../services/auth.service';
// import { GridRequest } from '../../../services/grid-request';

import { environment } from '../../../../../../../../environments/environment';

@Injectable()
export class CandidatesDataService {
    constructor(private http: HttpClient,
      //  private authService: AuthService
    ) {
    }

    public getCandidates(statusType: number,
        // gridRequest: GridRequest
        ): Observable<any> {
        let params = new HttpParams();

        params = params.set('statusType', statusType.toString());

        return this.http.post(`${environment.apiRootUrl}candidate/getAll`, statusType// gridRequest,n
        // { headers: this.authService.getAuthenticationHeader(), params: params }
    );
    }

    public getCandidate(candidateId: any): Observable<any> {
        return this.http.get(`${environment.apiRootUrl}candidate/` + candidateId// , { headers: this.authService.getAuthenticationHeader() }
    );
    }

    public createCandidate(candidate: any): Observable<any> {
        return this.http.post(`${environment.apiRootUrl}candidate`, candidate// , { headers: this.authService.getAuthenticationHeader() }
    );
    }

    public updateCandidate(candidate: any): Observable<any> {
        return this.http.put(`${environment.apiRootUrl}candidate`, candidate);
    }

    public deleteCandidate(candidateId: any): Observable<any> {
        return this.http.delete(`${environment.apiRootUrl}candidate/` + candidateId);
    }

    public changeCandidateStatus(ids: number[], status: any): Observable<any> {
        let params = new HttpParams();

        params = params.set('status', status);

        return this.http.post(`${environment.apiRootUrl}candidate/changeStatus`, ids,
         { params: params });
    }

    public getTechnologies(): Observable<any> {
        return this.http.get(`${environment.apiRootUrl}technology`);
    }

    public getExperiences(): Observable<any> {
        return this.http.get(`${environment.apiRootUrl}enum/Experience`);
    }

    public getCandidateByVacancyStage(vacancyId: number, stageId: number): Observable<any> {
        let params = new HttpParams();

        params = params.set('vacancyId', vacancyId.toString());
        params = params.set('stageId', stageId.toString());

        return this.http.get(`${environment.apiRootUrl}candidate/getByVacancyAndStage`,
         {  params: params });
    }

    public attachCandidateStageToVacancy(formData: any): Observable<any> {
        return this.http.post(`${environment.apiRootUrl}vacancy/attachCandidate`, formData,
        );
    }

    public getByCandidate(candidateId: number): Observable<any> {
        let params = new HttpParams();

        params = params.set('candidateId', candidateId.toString());

        return this.http.get(`${environment.apiRootUrl}vacancy/getByCandidate`,
         {  params: params });
    }

    public getVacancyByTechnologyAndExperience(experienceId: number, selectedTechnologies): Observable<any> {
        let params = new HttpParams();

        params = params.set('experience', experienceId.toString());

        return this.http.post(`${environment.apiRootUrl}vacancy/getByTechnologyAndExperience`,
         selectedTechnologies , {  params: params });
    }

    public detachVacancy(formData: any): Observable<any> {
        return this.http.post(`${environment.apiRootUrl}vacancy/detachCandidate`, formData,
         );
    }
}
