import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// import { Comparator, State, Filter } from '@clr/angular';

// import { Subscription } from 'rxjs/Subscription';

import { CandidatesDataService } from '../../services/candidates-data.service';
// import { NotificationService } from '../../../../services/notification.service';
// import { NotificationType } from '../../../../enums/notification-type';
// import { StatusCommands } from '../../../../constants/status-commands';
// import { EnumDataService } from '../../../../services/enum.data.service';
// import { EnumNames } from '../../../../constants/enum-names';
import { TransformBirthDateToAgePipe } from './transform-birthdate-to-age.pipe';
// import { GridRequest } from '../../../../services/grid-request';

@Component({
    templateUrl: './candidates-list.component.html',
    styleUrls: ['./candidates-list.component.scss']
})
export class CandidatesListComponent implements OnInit, OnDestroy {
    public sortCandidates = [];
    public candidates = [];
    public loading = true;
    public selectedCandidates: any[] = [];
    // public deleted = StatusCommands.DELETED;
    // public archived = StatusCommands.ARCHIVED;
    // public active = StatusCommands.ACTIVE;

    private vacancyId = 0;
    private stageId = 0;
    // private subscription: Subscription = new Subscription();

    public totalCount = 0;
    private sortField: { by: string | any, reverse: boolean } = { by: 'lastName', reverse: false };
    private currentState: any;
    private currentStatus = 0;

    public experiences: any;
    public statuses: any[] = [];

    constructor(private candidatesDataService: CandidatesDataService,
        private activeRoute: ActivatedRoute,
        // private notificationService: NotificationService,
        // private enumService: EnumDataService
    ) {

    }

    ngOnInit() {
        // this.subscription = this.activeRoute.params.subscribe(
        //     params => {
        //         this.vacancyId = params['vacancyId'];
        //         this.stageId = params['stageId'];
        //     });

        // this.enumService.getEnums(EnumNames.EXPERIENCE).subscribe(
        //     data => {
        //         if (data) {
        //             this.experiences = data.result;
        //         }
        //     }, error => {
        //         if (error.status === 400) {
        //             this.notificationService.notify(NotificationType.Error, 'experienceLoadError');
        //         }
        //     });

        // this.enumService.getEnums(EnumNames.STATUSTYPE).subscribe(
        //     data => {
        //         if (data) {
        //             this.statuses = data.result;
        //         }
        //     }, error => {
        //         if (error.status === 400) {
        //             this.notificationService.notify(NotificationType.Error, 'statusLoadError');
        //         }
        //     });
    }

    public getVacanciesByStatusType(event, status: number) {
        this.currentStatus = status;
        this.refresh(this.currentState);
    }

    public changeStatus($event, candidates, status) {
        // this.candidatesDataService.changeCandidateStatus(candidates.map(arr => arr.id), status).subscribe(
        //     data => {
        //         if (data) {
        //             this.notificationService.notify(NotificationType.Success,
        //                 candidates.length === 1 ? 'candidateChangeStatusSucces' : 'candidatesChangeStatusSucces');

        //             this.refresh(this.currentState);
        //         }
        //     },
        //     error => {
        //         if (error.status === 400) {
        //             this.notificationService.notify(NotificationType.Error, 'candidateChangeStatusError');
        //         }
        //     });
    }

    public refresh(state: any) {
        this.currentState = state;
        this.loading = true;
        if (state.sort) {
            this.sortField = state.sort;
        }

        const filters = this.getFiltersList(this.currentState.filters);

        // const gridRequest: GridRequest = {
        //     take: this.currentState.page.size,
        //     skip: this.currentState.page.from,
        //     sortField: this.sortField.by.toString(),
        //     sortDir: this.sortField.reverse === true ? 'desc' : 'asc',
        //     filters: filters
        // };

        // if (!this.vacancyId && !this.stageId) {
        //     this.candidatesDataService.getCandidates(this.currentStatus, gridRequest).subscribe(
        //         data => {
        //             this.candidates = data.result;
        //             this.totalCount = data.totalCount;
        //             this.loading = false;
        //         },
        //         error => {
        //             this.loading = false;
        //             if (error.status === 400) {
        //                 this.notificationService.notify(NotificationType.Error, 'candidatesListLoadError');
        //             }

        //         });
        // } else {
        //     this.candidatesDataService.getCandidateByVacancyStage(this.vacancyId, this.stageId).subscribe(
        //         data => {
        //             this.candidates = data.result;
        //             this.totalCount = data.totalCount;
        //             this.loading = false;
        //         },
        //         error => {
        //             this.loading = false;
        //             if (error.status === 400) {
        //                 this.notificationService.notify(NotificationType.Error, 'candidatesListLoadError');
        //             }
        //         });
        // }

        this.selectedCandidates = [];
    }

    ngOnDestroy() {
        // this.subscription.unsubscribe();
    }

    public getFiltersList(stateFilters: any[]): any[] {
        let filterList: any[] = [];

        if (stateFilters) {
            for (const item of stateFilters) {
                filterList = filterList.concat(item['filter']);
            }
        }
        return filterList;
    }
}
